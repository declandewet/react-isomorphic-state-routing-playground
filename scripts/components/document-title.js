

const { Component } = React

export default class DocumentTitle extends Component {
  componentWillReceiveProps(nextProps) {
    document.title = nextProps.title
  }
  render() {
    return this.props.children
  }
}
