import React from 'react';
import Store from './Store';

export default class StarWarsFilmSelector extends React.Component {
  state = {films: null};
  componentDidMount() {
    Store.subscribe(this._onUpdate);
    this._onUpdate();
  }
  componentWillUnmount() {
    Store.unsubscribe(this._onUpdate);
  }
  _onUpdate = () => {
    this.setState({films: Store.getFilms()});
  };
  _onChange = e => {
    if (e.target.value === 'null') {
      this.props.onChange(null);
    } else {
      const films = this.state.films.value;
      const film = films.find(film => film.url === e.target.value);
      this.props.onChange(film);
    }
  };
  render() {
    if (this.state.films === null) {
      return <div>Loading Films</div>;
    }

    if (!this.state.films.success) {
      return <div>Unable to load films</div>;
    }

    const films = this.state.films.value;
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
