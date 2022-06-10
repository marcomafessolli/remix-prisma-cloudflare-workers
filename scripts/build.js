var esbuild = require("esbuild");
var NodeModules = require("@esbuild-plugins/node-modules-polyfill");

var NodeModulesPolyfillPlugin = NodeModules.NodeModulesPolyfillPlugin;

async function build() {
  var mode = process.env.NODE_ENV?.toLowerCase() ?? "development";

  await esbuild.build({
    entryPoints: ["./build/index.js"],
    outfile: "./build/index.js",
    bundle: true,
    minify: mode === "production",
    sourcemap: mode !== "production",
    allowOverwrite: true,
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode), __dirname: JSON.stringify(__dirname)
    },
    plugins: [NodeModulesPolyfillPlugin()],
    inject: ["./process-env-shim.js"]
  });
}

build()
  .then(() => {
    console.log("Build complete");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
