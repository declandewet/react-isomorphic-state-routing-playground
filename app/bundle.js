
import webpack   from 'webpack'
import DevServer from 'webpack-dev-server'
import config    from '../webpack.config.js'

const bundle = () => {

  const compiler  = webpack(config)
  let bundleStart = null

  function onCompile() {
    console.log('bundling...')
    bundleStart = Date.now()
  }

  function onDone() {
    console.log(`bundled in ${Date.now() - bundleStart}ms`)
  }

  compiler.plugin('compile', onCompile)

  compiler.plugin('done', onDone)

  const bundler = new DevServer(compiler, {
    publicPath: '/js',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  })

  function listener() {
    console.log('bundling project, please wait...');
  }

  bundler.listen(8080, listener)

}

export default bundle
