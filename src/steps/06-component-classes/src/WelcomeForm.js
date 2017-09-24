const React = require('react');
const WelcomeMessage = require('./WelcomeMessage');

class WelcomeForm extends React.Component {
  render() {
    return (
      <div>
        <label>
          name:
          <input />
        </label>
        <WelcomeMessage name="Forbes" />
      </div>
    );
  }
}
module.exports = WelcomeForm;
