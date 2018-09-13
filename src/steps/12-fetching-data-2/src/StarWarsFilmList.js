import React from 'react';

export default class StarWarsFilmList extends React.Component {
  state = {error: null, films: null};
  async componentDidMount() {
    try {
      const response = await fetch('https://swapi.co/api/films/');
      if (!response.ok) {
        throw new Error(response.statusText + ': ' + (await response.text()));
      }
      const data = await response.json();
      this.setState({films: data.results});
    } catch (ex) {
      this.setState({error});
    }
  }
  render() {
    if (this.state.error !== null) {
      return <div>Unable to load films</div>;
    }
    if (this.state.films === null) {
      return <div>Loading Films</div>;
    }
    return (
      <ul>
        {this.state.films.map(film => (
          <li key={film.url}>{film.title}</li>
        ))}
      </ul>
    );
  }
}
