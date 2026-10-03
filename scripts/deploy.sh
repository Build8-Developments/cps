#!/usr/bin/env bash
#
# Ships an already-built standalone bundle to the cPanel server and activates
# it. Run by .github/workflows/deploy.yml after `npm run build`; see DEPLOY.md.
#
# Only build output is uploaded: no source, no dev dependencies, no env files.
# Do not run this from macOS: the bundle carries platform-specific binaries, so
# it must be built on Linux.
#
set -euo pipefail

: "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${DEPLOY_KEY:?}"
APP_NAME="${APP_NAME:-cps}"
PORT="${PORT:-3004}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASE="$(date -u +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)"

cd "$(dirname "$0")/.."

BUNDLE=.next/standalone
if [ ! -f "$BUNDLE/server.js" ]; then
  echo "No standalone build found. Run 'npm run build' first." >&2
  exit 1
fi

# The standalone output leaves these out; the server needs them next to server.js.
rm -rf "$BUNDLE/.next/static" "$BUNDLE/public"
cp -R .next/static "$BUNDLE/.next/static"
cp -R public "$BUNDLE/public"
cp ecosystem.config.cjs "$BUNDLE/"
# Next copies any .env file it finds into the bundle; secrets stay on the server.
rm -f "$BUNDLE"/.env*

SSH=(ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -i "$DEPLOY_KEY")
REMOTE="$DEPLOY_USER@$DEPLOY_HOST"
RELEASE_DIR="apps/$APP_NAME/releases/$RELEASE"

echo "==> Uploading release $RELEASE"
tar -czf - -C "$BUNDLE" . |
  "${SSH[@]}" "$REMOTE" "mkdir -p '$RELEASE_DIR' && tar -xzf - -C '$RELEASE_DIR'"

echo "==> Activating"
"${SSH[@]}" "$REMOTE" \
  APP_NAME="$APP_NAME" PORT="$PORT" RELEASE="$RELEASE" KEEP_RELEASES="$KEEP_RELEASES" \
  bash -s <<'REMOTE_SCRIPT'
set -euo pipefail
source "$HOME/.nvm/nvm.sh"

base="$HOME/apps/$APP_NAME"
new="$base/releases/$RELEASE"
env_file="$base/shared/.env"

if [ ! -f "$env_file" ]; then
  echo "Missing $env_file on the server (see DEPLOY.md)." >&2
  exit 1
fi

# Prints one status line per path; fails if any is not 200.
check() {
  local port="$1" ok=0 path code
  for _ in $(seq 1 30); do
    curl -s -o /dev/null -m 5 "http://127.0.0.1:$port/en" && break
    sleep 1
  done
  for path in /en /ar /studio; do
    code="$(curl -s -o /dev/null -m 30 -w '%{http_code}' "http://127.0.0.1:$port$path" || true)"
    printf '  %-8s %s\n' "$path" "$code"
    [ "$code" = 200 ] || ok=1
  done
  return "$ok"
}

start() {
  pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
  (cd "$base/current" && APP_NAME="$APP_NAME" PORT="$PORT" pm2 start ecosystem.config.cjs >/dev/null)
  pm2 save >/dev/null
}

# Try the new release on a spare port first, so a broken build never goes live.
trial_port=$((PORT + 10000))
echo "Trial run on port $trial_port:"
(cd "$new" && PORT="$trial_port" HOSTNAME=127.0.0.1 exec node --env-file="$env_file" server.js) >/dev/null 2>&1 &
trial_pid=$!
if check "$trial_port"; then trial_ok=0; else trial_ok=1; fi
kill "$trial_pid" 2>/dev/null || true
wait "$trial_pid" 2>/dev/null || true
if [ "$trial_ok" != 0 ]; then
  echo "Trial run failed; the live site was not touched." >&2
  rm -rf "$new"
  exit 1
fi

previous="$(readlink "$base/current" 2>/dev/null || true)"
ln -sfn "$new" "$base/current"
start
echo "Live on port $PORT:"
if ! check "$PORT"; then
  if [ -n "$previous" ] && [ -d "$previous" ]; then
    echo "New release failed its check; rolling back to $(basename "$previous")." >&2
    ln -sfn "$previous" "$base/current"
    start
  fi
  exit 1
fi

# Keep the newest releases for rollback; names sort by time.
ls -1d "$base"/releases/* | sort | head -n "-$KEEP_RELEASES" | while read -r old; do
  [ "$old" = "$new" ] || rm -rf "$old"
done
REMOTE_SCRIPT

echo "==> Deployed $RELEASE"
