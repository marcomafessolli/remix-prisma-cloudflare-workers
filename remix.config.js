/**
* @type {import('@remix-run/dev').AppConfig}
*/

module.exports = {
  serverBuildTarget: "cloudflare-workers",
  server: "./server.ts",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
};
