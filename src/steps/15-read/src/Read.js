const React = require('react');
const Store = require('./Store');

class Read extends React.Component {
  state = this.props.getData(Store);
  componentDidMount() {
    Store.subscribe(this._onUpdate);
  }
  componentWillUnmount() {
    Store.unsubscribe(this._onUpdate);
  }
  _onUpdate = () => {
    this.forceUpdate();
  };
  render() {
    return this.props.children(this.props.getData(Store));
  }
}
module.exports = Read;
