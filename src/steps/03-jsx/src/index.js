const React = require('react');
const ReactDOM = require('react-dom');

const root = document.getElementById('root');

setInterval(() => {
  ReactDOM.render(
    <div>
      <p>
        Mode:
        <span className={process.env.NODE_ENV === 'production' ? 'green' : 'red'}>
          {process.env.NODE_ENV}
        </span>
      </p>
      <p>{new Date().toString()}</p>
      <input placeholder="type something" />
    </div>,
    root
  );
}, 100);
