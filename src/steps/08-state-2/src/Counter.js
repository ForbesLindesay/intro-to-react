const React = require('react');

class Counter extends React.Component {
  state = {value: 0};
  increment = () => {
    this.setState({value: this.state.value + 1});
  };
  decrement = () => {
    this.setState({value: this.value - 1});
  };
  render() {
    return (
      <div>
        <button onClick={this.increment}>up</button>
        <button onClick={this.decrement}>down</button>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

module.exports = Counter;
