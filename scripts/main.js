
import React  from 'react/addons'
import Root   from './components/root'
import routes from './routes'

window.store = _.assign(window.store, { routes })

React.render(<Root {...window.store} />, document)
