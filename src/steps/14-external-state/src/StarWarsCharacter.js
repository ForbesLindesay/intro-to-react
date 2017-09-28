const React = require('react');
const request = require('then-request');
const Store = require('./Store');

class StarWarsCharacter extends React.Component {
  state = {character: null};
  componentDidMount() {
    Store.subscribe(this._onUpdate);
    this._onUpdate();
  }
  componentWillReceiveProps(props) {
    if (props.url !== this.props.url) {
      this._onUpdate();
    }
  }
  componentWillUnmount() {
    Store.unsubscribe(this._onUpdate);
  }
  _onUpdate = () => {
    this.setState({films: Store.getObject(this.props.url)});
  };
  render() {
    if (this.state.character === null) {
      return <li>Loading character</li>;
    }
    if (!this.state.character.success) {
      return <li>Unable to load character</li>;
    }
    return <li>{this.state.character.name}</li>;
  }
}
module.exports = StarWarsCharacter;
