const React = require('react');
const request = require('then-request');

class StarWarsFilmSelector extends React.Component {
  state = {error: null, films: null};
  componentDidMount() {
    request('get', 'https://swapi.co/api/films/')
      .getBody('utf8')
      .then(JSON.parse)
      .then(
        response => this.setState({films: response.results}),
        error => this.setState({error})
      );
  }
  _onChange = e => {
    if (e.target.value === 'null') {
      this.props.onChange(null);
    } else {
      const film = this.state.films.filter(film => film.url === e.target.value)[0];
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
module.exports = StarWarsFilmSelector;
