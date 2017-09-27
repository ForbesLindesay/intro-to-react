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
    // TODO: load the character data at the url
    // The api returns the character directly in the response,
    // so you just need "response", not "response.results"
  }
  render() {
    // TODO: render loading state, error state and character name
    // Render each as an <li> element
    // The following code will help you see what the state looks like:
    return (
      <pre>
        <code>{JSON.stringify(this.state, null, '  ')}</code>
      </pre>
    );
  }
}
module.exports = StarWarsCharacter;
