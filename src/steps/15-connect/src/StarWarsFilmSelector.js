const React = require('react');
const request = require('then-request');
const Store = require('./Store');
const connect = require('./connect');

class StarWarsFilmSelector extends React.Component {
  _onChange = e => {
    if (e.target.value === 'null') {
      this.props.onChange(null);
    } else {
      const films = this.props.films.value;
      const film = films.find(film => film.url === e.target.value);
      this.props.onChange(film);
    }
  };
  render() {
    if (this.props.films === null) {
      return <div>Loading Films</div>;
    }

    if (!this.props.films.success) {
      return <div>Unable to load films</div>;
    }

    const films = this.props.films.value;
    return (
      <select
        value={this.props.value ? this.props.value.url : 'null'}
        onChange={this._onChange}
      >
        <option value="null">Select a film</option>
        {films.map(film => (
          <option key={film.url} value={film.url}>
            {film.title}
          </option>
        ))}
      </select>
    );
  }
}
module.exports = connect(Store => {
  return {films: Store.getFilms()};
}, StarWarsFilmSelector);
