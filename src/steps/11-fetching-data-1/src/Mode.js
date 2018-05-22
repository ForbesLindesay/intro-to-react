const React = require('react');

function Mode() {
  return (
    <p>
      Mode:
      <span className={process.env.NODE_ENV === 'production' ? 'green' : 'red'}>
        {process.env.NODE_ENV}
      </span>
    </p>
  );
}
module.exports = Mode;
