import React from 'react';
import Read from './Read';

export default function StarWarsCharacter(props) {
  return (
    <Read getData={Store => Store.getObject(props.url)}>
      {characterObj => {
        if (characterObj === null) {
          return <li>Loading character</li>;
        }
        if (!characterObj.success) {
          return <li>Unable to load character</li>;
        }
        return <li>{characterObj.value.name}</li>;
      }}
    </Read>
  );
}
