import React from 'react';
import StarWarsFilmSelector from './StarWarsFilmSelector';
import StarWarsCharacter from './StarWarsCharacter';

export default class App extends React.Component {
  state = {selectedFilm: null};
  _onChangeFilm = selectedFilm => {
    this.setState({selectedFilm});
  };

  render() {
    return (
      <div>
        <StarWarsFilmSelector
          value={this.state.selectedFilm}
          onChange={this._onChangeFilm}
        />
        <ul>
          {this.state.selectedFilm &&
            this.state.selectedFilm.characters.map(url => {
              return <StarWarsCharacter key={url} url={url} />;
            })}
        </ul>
        <article>
          <pre>{this.state.selectedFilm && this.state.selectedFilm.opening_crawl}</pre>
        </article>
      </div>
    );
  }
}
