const babel = require('@rollup/plugin-babel').default
const resolve = require('@rollup/plugin-node-resolve').default
const clear = require('rollup-plugin-clear')
const { default: dts } = require('rollup-plugin-dts')

const rootFolder = __dirname
const extensions = ['.js', '.jsx', '.ts', '.tsx']

function fixDriveLetter(file) {
  return file.substring(0, 1).toUpperCase() + file.substring(1)
}

function isExternalModule(id) {
  return !id.startsWith('.') && !fixDriveLetter(id).includes(fixDriveLetter(rootFolder))
}

module.exports = () => {
  const input = 'src/index.ts'

  return [
    {
      input,
      output: {
        file: `lib/react-scrolllock.js`,
        format: 'cjs',
        sourcemap: true,
        esModule: false,
        exports: 'named',
      },
      external: isExternalModule,
      plugins: [
        // Clear output folder before each build
        clear({ targets: ['lib'] }),

        // Import resolver
        resolve({ extensions }),

        babel({
          extensions,
          sourceMaps: true,
          babelHelpers: 'runtime',
          presets: [
            require('@babel/preset-env'),
            require('@babel/preset-typescript'),
            [
              require('@babel/preset-react'),
              {
                runtime: 'automatic',
              },
            ],
          ],
          plugins: [require('@babel/plugin-transform-runtime')],
        }),
      ],
    },
    {
      input,
      output: {
        file: 'lib/index.d.ts',
        format: 'cjs',
        sourcemap: false,
      },
      external: isExternalModule,
      plugins: [dts()],
    },
  ]
}
