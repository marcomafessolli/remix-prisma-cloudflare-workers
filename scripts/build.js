const esbuild = require('esbuild')
const alias = require('esbuild-plugin-alias')
const {
  NodeModulesPolyfillPlugin,
} = require('@esbuild-plugins/node-modules-polyfill')

async function build() {
  const mode = process.env.NODE_ENV?.toLowerCase() ?? 'development'
  console.log(`Building Worker in ${mode} mode`)

  await esbuild.build({
    entryPoints: ['./worker/index.ts'],
    outfile: './dist/worker.js',
    bundle: true,
    minify: mode === 'production',
    sourcemap: mode !== 'production',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      __dirname: JSON.stringify(__dirname),
    },
    plugins: [
      NodeModulesPolyfillPlugin(),
      alias({
        '@prisma/client': require.resolve('@prisma/client'),
      }),
    ],
    inject: ['./process-env-shim.js'],
  })
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
