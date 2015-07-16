
const { Component } = React

export default class Profile extends Component {

  render() {
    return this.props.loading
      ? (<div>Loading...</div>)
      : (<div>
          <h1>{this.props.user}'s Profile</h1>
          <ul>
            <li><a href='/'>Go back home</a></li>
          </ul>
        </div>)

  }

}
