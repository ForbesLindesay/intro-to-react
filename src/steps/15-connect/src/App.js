const React = require('react');
const StarWarsFilmSelector = require('./StarWarsFilmSelector');
const StarWarsCharacter = require('./StarWarsCharacter');

class App extends React.Component {
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

module.exports = App;
