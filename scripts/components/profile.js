
const { Component } = React

export default class Profile extends Component {

  render() {
    return this.props.loading
      ? (<div>Loading...</div>)
      : (<div>
          <h1>{this.props.user}'s Profile</h1>
          <ul>
            <li><a href='/home'>Go back home (this is a redirected route)</a></li>
          </ul>
        </div>)

  }

}
