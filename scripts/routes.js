
import NotFoundPage from './components/not-found-page'
import HomePage     from './components/home'
import Profile      from './components/profile'

export default {
  routes: {
    '/'          : HomePage,
    '/users/:id' : Profile,
    '*'          : NotFoundPage,
  },
  redirects: {}
}
