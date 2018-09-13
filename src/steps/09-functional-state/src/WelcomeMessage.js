import React from 'react';

export default function WelcomeMessage(props) {
  return (
    <div>
      Welcome <strong>{props.name}</strong>
    </div>
  );
}
