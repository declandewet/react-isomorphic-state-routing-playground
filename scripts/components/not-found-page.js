
const {
  Component,
} = React

export default class NotFoundPage extends Component {

  render() {
    return (
      <div>
        <h1>That page could not be found, sorry.</h1>
        <p><a href='/'>Go home</a></p>
        <h2>Props:</h2>
        <pre><code>{JSON.stringify(this.props, null, 2)}</code></pre>
      </div>
    )
  }

}
