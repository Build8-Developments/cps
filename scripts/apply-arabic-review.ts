/**
 * Applies the 13 Oct 2026 Arabic copy review to existing Sanity documents.
 * Seeding only fills missing fields, so wording changes need this targeted,
 * revision-checked patch. Dry run unless --apply is supplied.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

type Pair = [from: string, to: string];
type ReviewData = {
  ar: {
    sub: Pair[];
    exact: Pair[];
    fields: { id: string; path: string; from?: string; value: string }[];
    homeServiceCardTitle: { from: string; to: string; docs: string[] };
    projects: Record<string, { summary: string; event?: [from: string, to: string] }>;
  };
};
type Doc = Record<string, unknown> & {
  _id: string;
  _rev: string;
  _type: string;
  language?: string;
  locale?: string;
  slug?: { current?: string };
};
type Change = { path: string; from: string; to: string };

loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apply = process.argv.includes("--apply");
const token = apply
  ? process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
  : process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Sanity project and token are required.");
const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

const data = JSON.parse(
  readFileSync(join(process.cwd(), "scripts/data/arabic-review-2026-10-13.json"), "utf8"),
) as ReviewData;

const SKIP_KEYS = new Set(["slug", "href", "url", "language", "locale"]);
const isUrlLike = (value: string) => /^(https?:\/\/|\/|mailto:|tel:)/.test(value);

function rewriteString(value: string, sub: Pair[], exact: Map<string, string>): string {
  const whole = exact.get(value.trim());
  if (whole !== undefined) return whole;
  let next = value;
  for (const [from, to] of sub) {
    if (next.includes(from)) next = next.replaceAll(from, to);
  }
  return next;
}

/** Walks a document, rewriting copy in place and descending into JSON payload strings. */
function rewrite(
  node: unknown,
  path: string,
  sub: Pair[],
  exact: Map<string, string>,
  changes: Change[],
): unknown {
  if (typeof node === "string") {
    if (isUrlLike(node)) return node;
    if (/^[[{]/.test(node) && node.length > 40) {
      try {
        const parsed: unknown = JSON.parse(node);
        const before = changes.length;
        const rewritten = rewrite(parsed, `${path}<json>`, sub, exact, changes);
        if (changes.length === before) return node;
        return /\n/.test(node) ? JSON.stringify(rewritten, null, 2) : JSON.stringify(rewritten);
      } catch {
        // not JSON: treat as plain copy
      }
    }
    const next = rewriteString(node, sub, exact);
    if (next !== node) changes.push({ path, from: node, to: next });
    return next;
  }
  if (Array.isArray(node)) {
    return node.map((item, index) => rewrite(item, `${path}[${index}]`, sub, exact, changes));
  }
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] =
        key.startsWith("_") || SKIP_KEYS.has(key)
          ? value
          : rewrite(value, path ? `${path}.${key}` : key, sub, exact, changes);
    }
    return out;
  }
  return node;
}

/** The home service card is the only place «التجهيز الداخلي» is a standalone title. */
function retitleHomeServiceCard(node: unknown, path: string, changes: Change[]): unknown {
  const { from, to } = data.ar.homeServiceCardTitle;
  if (typeof node === "string" && /^[[{]/.test(node) && node.length > 40) {
    try {
      const before = changes.length;
      const rewritten = retitleHomeServiceCard(JSON.parse(node), `${path}<json>`, changes);
      if (changes.length === before) return node;
      return /\n/.test(node) ? JSON.stringify(rewritten, null, 2) : JSON.stringify(rewritten);
    } catch {
      return node;
    }
  }
  if (Array.isArray(node)) {
    return node.map((item, index) => retitleHomeServiceCard(item, `${path}[${index}]`, changes));
  }
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === "title" && value === from && /services/i.test(path)) {
        changes.push({ path: `${path}.title`, from, to });
        out[key] = to;
      } else {
        out[key] = key.startsWith("_")
          ? value
          : retitleHomeServiceCard(value, path ? `${path}.${key}` : key, changes);
      }
    }
    return out;
  }
  return node;
}

function sameValue(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function main() {
  const docs = await client.fetch<Doc[]>(
    `*[!(_type match "system.*") && !(_type match "sanity.*") && !(_id in path("drafts.**")) && (language == "ar" || locale == "ar")]`,
  );
  const arExact = new Map(data.ar.exact);
  const plan: { document: Doc; set: Record<string, unknown>; changes: Change[] }[] = [];

  for (const doc of docs) {
    const changes: Change[] = [];
    let next = rewrite(doc, "", data.ar.sub, arExact, changes) as Doc;

    if (data.ar.homeServiceCardTitle.docs.includes(doc._id)) {
      next = retitleHomeServiceCard(next, "", changes) as Doc;
    }
    for (const field of data.ar.fields) {
      if (field.id !== doc._id) continue;
      const current = next[field.path];
      if (current === field.value) continue;
      if (field.from !== undefined && current !== field.from) continue;
      changes.push({ path: field.path, from: String(current ?? ""), to: field.value });
      next = { ...next, [field.path]: field.value };
    }
    if (doc._type === "project") {
      const project = data.ar.projects[doc.slug?.current ?? ""];
      if (project) {
        const seo = next.seo as { description?: string } | undefined;
        if (seo?.description === next.summary && seo.description !== project.summary) {
          changes.push({ path: "seo.description", from: seo.description ?? "", to: project.summary });
          next = { ...next, seo: { ...seo, description: project.summary } };
        }
        if (next.summary !== project.summary) {
          changes.push({ path: "summary", from: String(next.summary ?? ""), to: project.summary });
          next = { ...next, summary: project.summary };
        }
        if (project.event && next.event === project.event[0]) {
          changes.push({ path: "event", from: project.event[0], to: project.event[1] });
          next = { ...next, event: project.event[1] };
        }
      }
    }

    const set: Record<string, unknown> = {};
    for (const key of Object.keys(next)) {
      if (!key.startsWith("_") && !sameValue(next[key], doc[key])) set[key] = next[key];
    }
    if (Object.keys(set).length) plan.push({ document: doc, set, changes });
  }

  const byType: Record<string, number> = {};
  for (const { document } of plan) byType[document._type] = (byType[document._type] ?? 0) + 1;
  const stringChanges = plan.reduce((total, entry) => total + entry.changes.length, 0);

  if (process.argv.includes("--verbose")) {
    for (const { document, changes } of plan) {
      console.log(`\n${document._id}`);
      for (const change of changes) console.log(`  ${change.path}\n    - ${change.from}\n    + ${change.to}`);
    }
  }
  console.log(JSON.stringify({ dataset, documents: plan.length, stringChanges, byType }, null, 2));

  if (!apply) {
    const reportPath = join(tmpdir(), `cps-arabic-review-plan-${Date.now()}.json`);
    writeFileSync(
      reportPath,
      JSON.stringify(plan.map(({ document, changes }) => ({ id: document._id, changes })), null, 2),
      { mode: 0o600 },
    );
    console.log(`Dry run: nothing written. Plan: ${reportPath}\nRe-run with --apply to write.`);
    return;
  }
  if (!plan.length) {
    console.log("Nothing to update.");
    return;
  }
  const backupPath = join(tmpdir(), `cps-arabic-review-before-${Date.now()}.json`);
  writeFileSync(backupPath, JSON.stringify(plan.map(({ document }) => document), null, 2), { mode: 0o600 });
  for (let index = 0; index < plan.length; index += 50) {
    let transaction = client.transaction();
    for (const { document, set } of plan.slice(index, index + 50)) {
      transaction = transaction.patch(document._id, (patch) => patch.ifRevisionId(document._rev).set(set));
    }
    await transaction.commit();
  }
  console.log(`Updated ${plan.length} documents. Backup of previous versions: ${backupPath}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Arabic review migration failed");
  process.exitCode = 1;
});
