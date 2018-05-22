const React = require('react');
const WelcomeMessage = require('./WelcomeMessage');

class WelcomeForm extends React.Component {
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
module.exports = WelcomeForm;
