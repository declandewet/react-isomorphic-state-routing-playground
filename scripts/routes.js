
import NotFoundPage from './components/not-found-page'
import HomePage     from './components/home'
import Profile      from './components/profile'

export default {
  '/'          : HomePage,
  '/home'      : '/',
  '/users/:id' : Profile,
  '*'          : NotFoundPage
}
