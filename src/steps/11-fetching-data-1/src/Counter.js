import React from 'react';

export default class Counter extends React.Component {
  state = {value: 0};
  increment = () => {
    this.setState(oldState => ({value: oldState.value + 1}));
  };
  decrement = () => {
    this.setState(oldState => ({value: oldState.value - 1}));
  };
  render() {
    return (
      <div>
        <button onClick={this.increment}>up</button>
        <button onClick={this.decrement}>down</button>
        <p className={this.state.value % 2 === 0 ? 'green' : 'red'}>{this.state.value}</p>
      </div>
    );
  }
}
