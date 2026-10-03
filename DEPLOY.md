# Deploying

Every push to `main` deploys the site. GitHub Actions builds it and uploads **only the build output** to the cPanel server; the server never holds the source code and never runs an install or a build.

## Deploy

```bash
git push origin main
```

Watch it under the repo's **Actions** tab, or:

```bash
gh run watch
```

To redeploy without a new commit, press **Run workflow** on the Deploy workflow, or:

```bash
gh workflow run deploy.yml
```

## What a deploy does

1. Installs dependencies with `npm ci`, runs `npx tsc --noEmit` and `npm run lint`, checks that Sanity returns content, then `npm run build` (Next.js standalone output).
2. Uploads the bundle to a new folder, `~/apps/cps/releases/<time>-<commit>`.
3. Starts that release on a spare port (13004) and checks `/en`, `/ar` and `/studio`. If any fails, the deploy stops and the live site is not touched.
4. Points `~/apps/cps/current` at the new release and restarts pm2.
5. Checks the live port again; on failure it switches back to the previous release.
6. Keeps the five newest releases and deletes older ones.

## How it is set up

```text
Browser ─► Apache (80/443) ─► ~/public_html/.htaccess proxy rule ─► 127.0.0.1:3004 (node server.js, under pm2)
```

| What | Where |
| --- | --- |
| Workflow | [.github/workflows/deploy.yml](.github/workflows/deploy.yml) |
| Upload and activation logic | [scripts/deploy.sh](scripts/deploy.sh) (run by the workflow; do not run it from macOS) |
| Releases on the server | `~/apps/cps/releases/`, live one linked as `~/apps/cps/current` |
| Runtime env file (not in git, mode 600) | `~/apps/cps/shared/.env` |
| Process manager | pm2, config in [ecosystem.config.cjs](ecosystem.config.cjs), shipped inside each release |
| Proxy and redirect rules | `~/public_html/.htaccess`, between the `cps-node-proxy` markers |
| Restart after reboot | one `@reboot` line in `crontab -l` that runs `pm2 resurrect` |
| Node on the server | nvm (`~/.nvm`), Node 24 LTS |

`cgi-bin` and `.well-known` in `public_html` are excluded from the proxy and served from disk. The same file redirects HTTP and the bare domain to `https://www.creativesprofessionals.com`.

Do not add an `X-Forwarded-Proto: https` header to the proxy. On the Aevenda site it made Next send every proxy rewrite to `https://localhost:<port>`, which returned 500. This site's `src/proxy.ts` only redirects today, but the same would happen as soon as it gains a rewrite.

## Settings

**Build-time values** are baked into the bundle, so they live on GitHub (repo → Settings → Secrets and variables → Actions → Variables). Changing one takes effect on the next deploy.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.creativesprofessionals.com` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` lets search engines index the site; `false` sends noindex |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity project |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://www.creativesprofessionals.com/studio` |
| `DEPLOY_HOST`, `DEPLOY_USER`, `APP_NAME`, `APP_PORT` | Where to deploy |
| `DEPLOY_KNOWN_HOSTS` | The server's SSH host key, so the workflow only talks to the real server |

**One secret:** `DEPLOY_SSH_KEY`, a key used only by GitHub Actions. Its public half is the `github-actions-deploy@cps` line in `~/.ssh/authorized_keys` on the server.

The Sanity dataset is public, so the build needs no token. The workflow still queries Sanity before building and stops if it returns no projects, because CMS fetches fall back to local content silently. If the dataset is ever made private, add `SANITY_API_READ_TOKEN` as a secret and pass it to that check and to the build.

**Runtime secrets** (`RESEND_API_KEY`, `SANITY_REVALIDATE_SECRET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, the `EMAIL_*` values) are read from the server's env file and never leave the server. To change one:

```bash
ssh -i ~/.ssh/host/marketing creativesprofess@66.29.134.120
export TERM=xterm-256color
nano ~/apps/cps/shared/.env
pm2 restart cps
```

## Roll back

On the server, point `current` at an older release and restart:

```bash
ls ~/apps/cps/releases
ln -sfn ~/apps/cps/releases/<older-release> ~/apps/cps/current
cd ~/apps/cps/current && pm2 delete cps && pm2 start ecosystem.config.cjs && pm2 save
```

## Useful commands (on the server)

```bash
pm2 ls                    # is it running?
pm2 logs cps          # app output; look for "[sanity]" warnings
pm2 restart cps       # restart the live release
```

## Sanity

- **CORS origin:** `https://www.creativesprofessionals.com`, with credentials allowed (needed to log in at `/studio`).
- **Webhook:** `POST https://www.creativesprofessionals.com/api/revalidate`, secret equal to `SANITY_REVALIDATE_SECRET`, projection `{_type}`.

## If SSH from GitHub stops working

GitHub's runners connect from changing addresses, so the server's SSH port must stay open to the internet. If the workflow fails at "Ship and activate" with a connection timeout, ask the server's IT whether SSH was restricted by address.
