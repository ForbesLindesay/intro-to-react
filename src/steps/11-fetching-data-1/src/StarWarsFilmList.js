const React = require('react');
const request = require('then-request');

class StarWarsFilmList extends React.Component {
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
  render() {
    if (this.state.error !== null) {
      return <div>Unable to load films</div>;
    }
    if (this.state.films === null) {
      return <div>Loading Films</div>;
    }
    return <ul>{this.state.films.map(film => <li key={film.url}>{film.title}</li>)}</ul>;
  }
}
module.exports = StarWarsFilmList;
