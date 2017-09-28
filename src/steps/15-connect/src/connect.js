const React = require('react');
const Store = require('./Store');

function connect(fn, ChildComponent) {
  return class Connect extends React.Component {
    state = fn(Store, this.props);
    componentDidMount() {
      Store.subscribe(this._onUpdate);
      this._onUpdate();
    }
    componentWillUnmount() {
      Store.unsubscribe(this._onUpdate);
    }
    componentWillReceiveProps(props) {
      for (const key in props) {
        if (props[key] !== this.props[key]) {
          this.setState(fn(Store, props));
          return;
        }
      }
    }
    _onUpdate = () => {
      this.setState(fn(Store, this.props));
    };
    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  };
}
module.exports = connect;
