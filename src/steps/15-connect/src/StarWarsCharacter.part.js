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
  }
  render() {
    // TODO: render loading state, error state and character name
    // Render each as an <li> element
  }
}
module.exports = StarWarsCharacter;
