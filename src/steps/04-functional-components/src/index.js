const React = require('react');
const ReactDOM = require('react-dom');
const WelcomeMessage = require('./WelcomeMessage');

const root = document.getElementById('root');

ReactDOM.render(
  <div>
    <input placeholder="type something" />
    <WelcomeMessage name="Forbes" />
  </div>,
  root
);
