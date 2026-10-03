/**
 * pm2 process definition for the cPanel server (see DEPLOY.md).
 *
 * Shipped inside every release bundle and started from there, so `__dirname`
 * is the release folder and `server.js` is Next's standalone server.
 *
 * The app listens on loopback by default; the web server in front proxies to
 * it. Other accounts on the machine override the name and port, e.g.
 * `APP_NAME=hotspot PORT=3003 pm2 start ecosystem.config.cjs`. Set
 * `HOST=0.0.0.0` only for a temporary preview by IP (plain HTTP, bypasses the
 * web server).
 */
const os = require("node:os");
const path = require("node:path");

const name = process.env.APP_NAME || "cps";
const port = process.env.PORT || "3004";
const host = process.env.HOST || "127.0.0.1";
// Runtime secrets live outside the releases so deploys never touch them.
const envFile =
  process.env.ENV_FILE || path.join(os.homedir(), "apps", name, "shared", ".env");

module.exports = {
  apps: [
    {
      name,
      cwd: __dirname,
      script: "server.js",
      node_args: `--env-file=${envFile}`,
      // HOSTNAME must be set explicitly: the shell exports the machine's
      // hostname under that name, which would make the server listen publicly.
      env: { NODE_ENV: "production", PORT: port, HOSTNAME: host },
      max_memory_restart: "1G",
    },
  ],
};
