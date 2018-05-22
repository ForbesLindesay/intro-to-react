const React = require('react');
const request = require('then-request');
const Read = require('./Read');

function StarWarsFilmSelector(props) {
  return (
    <Read getData={Store => Store.getFilms()}>
      {filmsObj => {
        if (filmsObj === null) {
          return <div>Loading Films</div>;
        }

        if (!filmsObj.success) {
          return <div>Unable to load films</div>;
        }

        const films = filmsObj.value;
        return (
          <select
            value={props.value ? props.value.url : 'null'}
            onChange={e => {
              if (e.target.value === 'null') {
                props.onChange(null);
              } else {
                const film = films.find(film => film.url === e.target.value);
                props.onChange(film);
              }
            }}
          >
            <option value="null">Select a film</option>
            {films.map(film => (
              <option key={film.url} value={film.url}>
                {film.title}
              </option>
            ))}
          </select>
        );
      }}
    </Read>
  );
}
module.exports = StarWarsFilmSelector;
