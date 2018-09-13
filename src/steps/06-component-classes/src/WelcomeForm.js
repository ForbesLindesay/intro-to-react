import React from 'react';
import WelcomeMessage from './WelcomeMessage';

export default class WelcomeForm extends React.Component {
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
