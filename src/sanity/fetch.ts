import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { cache } from "react";
import { sanityClient } from "./client";
import { isSanityConfigured, sanityReadToken } from "./env";
import { createClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
} from "./env";

const fetchSanityQuery = cache(
  async <T>(
    query: string,
    paramsJson: string,
    tagsKey: string,
    preview: boolean,
  ): Promise<T | null> => {
    if (!isSanityConfigured() || !sanityClient) {
      return null;
    }

    const params = JSON.parse(paramsJson) as QueryParams;
    const client =
      preview && sanityReadToken
        ? createClient({
            projectId: sanityProjectId,
            dataset: sanityDataset,
            apiVersion: sanityApiVersion,
            useCdn: false,
            token: sanityReadToken,
            perspective: "previewDrafts",
            stega: { enabled: Boolean(sanityStudioUrl), studioUrl: sanityStudioUrl },
          })
        : sanityClient;

    try {
      return await client.fetch<T>(query, params, {
        next: {
          revalidate: preview || process.env.NODE_ENV === "development" ? 0 : 3600,
          tags: tagsKey ? tagsKey.split(",") : [],
        },
      });
    } catch {
      return null;
    }
  },
);

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  let preview = false;
  try {
    preview = (await draftMode()).isEnabled;
  } catch {
    preview = false;
  }

  return fetchSanityQuery<T>(
    query,
    JSON.stringify(params),
    tags.join(","),
    preview,
  );
}
