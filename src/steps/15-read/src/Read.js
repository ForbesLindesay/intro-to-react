import React from 'react';
import Store from './Store';

export default class Read extends React.Component {
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
