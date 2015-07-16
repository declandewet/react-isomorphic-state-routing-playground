import page          from 'page'
import pathToRegExp  from 'path-to-regexp'
import querystring   from 'querystring'
import DocumentTitle from './document-title'

class ReactPageNavigationError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
  }
}

const entries = o => (for (k of Object.keys(o)) [k, o[k]])

function isMounted(component) {
  try {
    React.findDOMNode(component)
    return true
  } catch (e) {
    return false
  }
}

function singleLine(lits, ...subs) {
  return subs
    .map((s, i) => lits[i] + s)
    .reduce((a, b) => a + b) + lits[lits.length - 1]
    .replace(/(?:\s+)/g, ' ')
}

const {Component} = React

@(target => {
  ['route', 'start', 'redirect', 'middleware', 'show']
    .forEach(x => target[x] = page)
  target.stop  = page.stop
})

export default class ReactPage extends Component {

  state = { component: this._getInitialComponentState() }

  componentDidMount() {
    if (isMounted(this)) {

      let { props }  = this
      let { routes } = props

      ReactPage.middleware(this._attachQueryParams)

      for (let [route, Handler] of entries(routes)) {
        if (typeof Handler !== 'string') {
          ReactPage.route(
            route,
            this._intializeRoutes.bind(this, route, Handler)
          )
        } else {
          ReactPage.redirect(route, Handler)
        }
      }

      ReactPage.start({ dispatch: false })
    }
  }

  componentWillUnmount() {
    ReactPage.stop()
  }

  _getInitialComponentState() {
    let MatchedHandler  = null
    let { props }       = this
    let { routes, url } = props

    for (let [route, Handler] of entries(routes)) {
      if (pathToRegExp(route, []).exec(url) && typeof Handler !== 'string') {
        MatchedHandler = (
          <DocumentTitle {...props}>
            <Handler {...props} />
          </DocumentTitle>
        )
        break
      }
    }

    if (MatchedHandler == null) { throw new ReactPageNavigationError(
      singleLine`
        ReactPage could not find an appropriate initial route handler for
        ${url}.

        There are two ways you can handle this error.

        The first way is to ensure that you have mapped a
        handler to the "*" route, so that any page not matched
        defaults to this handler.

        The second way applies if you're isomorphic - add some middleware to
        your backend that detects "ReactPageNavigationError", if caught,
        move on to the next middleware in your server pipeline, if not,
        call "React.render()".

        If you want, you can do both.

        For more information, visit
        http://react-page.github.io/errors/react-page-navigation-error
      `
    )}

    return MatchedHandler
  }

  _attachQueryParams(context, next) {
    context.querystring = location.search.slice(1)
    context.query       = querystring.parse(context.querystring)
    next()
  }

  async _intializeRoutes(route, Handler, context) {
    let props, component, response, json
    try {

      props     = Object.assign({}, props, context)
      component = (
        <DocumentTitle {...props}>
          <Handler loading={true} {...props} />
        </DocumentTitle>
      )

      this.setState({ component })

      response = await fetch(context.canonicalPath, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })

      json = await response.json()

    } catch (error) {
      throw new ReactPageNavigationError(singleLine`
        There was an error when attempting to set router state to new component.
      `)
    } finally {
      props     = Object.assign({}, props, json)
      component = (
        <DocumentTitle {...props}>
          <Handler {...props} />
        </DocumentTitle>
      )

      this.setState({ component })
    }
  }

  render() {
    return this.state.component
  }

}
