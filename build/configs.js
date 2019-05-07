const path = require('path')
const svelte = require('rollup-plugin-svelte')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version
const banner =
`/*!
  * svelte-router v${version}
  * (c) ${new Date().getFullYear()} Evan You
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolve('dist/svelte-router.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/svelte-router.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/svelte-router.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/svelte-router.esm.js'),
    format: 'es'
  },
  {
    file: resolve('dist/svelte-router.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve('dist/svelte-router.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      external: ['svelte', 'svelte/store', 'svelte/internal'],
      plugins: [
        svelte(),
        flow(),
        node(),
        cjs(),
        replace({
          __VERSION__: version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'SvelteRouter'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble())
  }

  return config
}
