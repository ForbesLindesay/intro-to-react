import React from 'react';

export default class StarWarsFilmSelector extends React.Component {
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
  _onChange = e => {
    if (e.target.value === 'null') {
      this.props.onChange(null);
    } else {
      const film = this.state.films.find(film => film.url === e.target.value);
      this.props.onChange(film);
    }
  };
  render() {
    if (this.state.error !== null) {
      return <div>Unable to load films</div>;
    }
    if (this.state.films === null) {
      return <div>Loading Films</div>;
    }
    return (
      <select
        value={this.props.value ? this.props.value.url : 'null'}
        onChange={this._onChange}
      >
        <option value="null">Select a film</option>
        {this.state.films.map(film => (
          <option key={film.url} value={film.url}>
            {film.title}
          </option>
        ))}
      </select>
    );
  }
}
