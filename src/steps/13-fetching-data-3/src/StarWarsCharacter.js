const React = require('react');
const request = require('then-request');

class StarWarsCharacter extends React.Component {
  state = {error: null, character: null};
  componentDidMount() {
    this.load(this.props.url);
  }
  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      this.load(props.url);
    }
  }
  load(url) {
    this.setState({error: null, character: null});
    request('get', url)
      .getBody('utf8')
      .then(JSON.parse)
      .then(
        response => this.setState({character: response}),
        error => this.setState({error})
      );
  }
  render() {
    if (this.state.error !== null) {
      return <li>Unable to load character</li>;
    }
    if (this.state.character === null) {
      return <li>Loading character</li>;
    }
    return <li>{this.state.character.name}</li>;
  }
}
module.exports = StarWarsCharacter;
