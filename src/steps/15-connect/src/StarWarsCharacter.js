const React = require('react');
const request = require('then-request');
const Store = require('./Store');
const connect = require('./connect');

class StarWarsCharacter extends React.Component {
  render() {
    if (this.props.character === null) {
      return <li>Loading character</li>;
    }
    if (!this.props.character.success) {
      return <li>Unable to load character</li>;
    }
    return <li>{this.props.character.value.name}</li>;
  }
}
module.exports = connect(
  (Store, props) => ({character: Store.getObject(props.url)}),
  StarWarsCharacter
);
