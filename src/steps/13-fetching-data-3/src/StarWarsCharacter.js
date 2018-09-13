import React from 'react';

export default class StarWarsCharacter extends React.Component {
  state = {error: null, character: null};
  componentDidMount() {
    this.load(this.props.url);
  }
  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      this.load(props.url);
    }
  }
  async load(url) {
    this.setState({error: null, character: null});
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText + ': ' + (await response.text()));
      }
      const data = await response.json();
      if (this.props.url === url) {
        this.setState({character: data});
      }
    } catch (ex) {
      this.setState({error});
    }
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
