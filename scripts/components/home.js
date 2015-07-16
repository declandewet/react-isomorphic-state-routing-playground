
const {
  Component,
} = React

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to the home page.</h1>
        <ul>
          <li><a href='/users/1'>Go to Bob's profile</a></li>
          <li><a href='/users/2'>Go to Batman's profile</a></li>
          <li><a href='/noooo'>Go to a page that does not exist</a></li>
        </ul>
      </div>
    )
  }

}
