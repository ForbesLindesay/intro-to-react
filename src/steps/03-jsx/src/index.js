const React = require('react');
const ReactDOM = require('react-dom');

const root = document.getElementById('root');

setInterval(() => {
  ReactDOM.render(
    <div>
      <p>{new Date().toString()}</p>
      <input placeholder="type something" />
    </div>,
    root
  );
}, 100);
