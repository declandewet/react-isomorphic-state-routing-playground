import express    from 'express'
import http       from 'http'
import bodyParser from 'body-parser'
import router     from './router'

global.React = require('react/addons')
global._     = require('lodash')

const Root   = require('../scripts/components/root')
const {
    routes,
    redirects,
} = require('../scripts/routes')

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT       = PRODUCTION ? 8080 : 4000

const app = express()

app.set('x-powered-by', false)
app.set('trust proxy', true)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

if (!PRODUCTION) {
  const httpProxy = require('http-proxy')
  const bundle    = require('./bundle')
  const proxy     = httpProxy.createProxyServer()
  const serveJSFromMemory = (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:8080'})
  }
  bundle()
  app.all('/js/*', serveJSFromMemory)
  proxy.on('error', ::console.error)
}

app.use((req, res, next) => {
  res.payload = _.extend(res.payload || {}, {
    query: req.query,
    url: req.url,
    params: req.params,
    lang: 'en',
    routes,
    redirects,
    meta: {
      charSet: 'utf-8',
      author: 'Declan de Wet'
    }
  })
  res.sendPayload = function createPayload(data) {
    res.payload = _.assign(res.payload, {
      params: req.params
    }, data)
    next()
  }
  next()
})

app.use(router)

const sendComponentOrXHRPayload = (req, res, next) => {
  try {
    if (req.xhr) return res.json(res.payload)
    const html = React.renderToString(<Root {...res.payload} />)
    return res.send(`<!doctype html>${html}`)
  } catch (error) {
    if (error.name === 'ReactPageNavigationError') next()
  }
}

app.get('*', sendComponentOrXHRPayload)

const server = http.Server(app)

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))
