import React from 'react';
import WelcomeMessage from './WelcomeMessage';

export default class WelcomeForm extends React.Component {
  state = {name: ''};
  _onChange = e => {
    this.setState({name: e.target.value});
  };
  render() {
    return (
      <div>
        <label>
          name:
          <input value={this.state.name} onChange={this._onChange} />
        </label>
        <WelcomeMessage name={this.state.name} />
      </div>
    );
  }
}
