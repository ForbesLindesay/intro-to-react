const React = require('react');

function WelcomeMessage(props) {
  return (
    <div>
      Welcome <strong>{props.name}</strong>
    </div>
  );
}

module.exports = WelcomeMessage;
