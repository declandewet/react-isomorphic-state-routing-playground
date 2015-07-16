
import ReactPage from './react-page'

const {
    Component,
} = React

export default class Root extends Component {

  state = { rendered: false }

  componentDidMount() {
    delete window.store
    this.setState({ rendered: true })
  }

  _writeProps() {
    return this.state.rendered ? null : (
      <script dangerouslySetInnerHTML={
        { __html: `window.store = ${JSON.stringify(this.props)}` }
      } />
    )
  }

  render() {
    return (
      <html lang={this.props.lang}>
        <head>
          <meta charSet={this.props.meta.charSet} />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge, chrome=1' />
          <title>{this.props.title}</title>
          <meta name='description' content={this.props.meta.description} />
          <meta name='author' content={this.props.meta.author} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </head>
        <body id='root'>
          <ReactPage {...this.props} />
          {this._writeProps()}
          <script src='/js/vendor.js' />
          <script src='/js/bundle.js' />
        </body>
      </html>
    )
  }

}
