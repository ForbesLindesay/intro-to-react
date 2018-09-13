import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeMessage from './WelcomeMessage';

const root = document.getElementById('root');

ReactDOM.render(
  <div>
    <input placeholder="type something" />
    <WelcomeMessage name="Forbes" />
  </div>,
  root
);
