const request = require('then-request');

const subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
}

export function unsubscribe(fn) {
  const index = subscribers.indexOf(fn);
  if (index !== -1) {
    subscribers.splice(index, 1);
  }
}

function onUpdate() {
  subscribers.forEach(fn => fn());
}

let fetchingFilms = false;
let filmURLs = null;
let filmsError = null;

const fetchingURL = {};
const objectsByURL = {};
const errorsByURL = {};

export function getObject(url) {
  if (errorsByURL[url]) {
    return errorsByURL[url];
  }
  if (objectsByURL[url]) {
    return objectsByURL[url];
  }
  if (!fetchingURL[url]) {
    fetchingURL[url] = true;
    request('get', url)
      .getBody('utf8')
      .then(JSON.parse)
      .then(
        response => {
          objectsByURL[url] = response;
          fetchingURL[url] = false;
          onUpdate();
        },
        error => {
          errorsByURL[url] = response;
          fetchingURL[url] = false;
          onUpdate();
        }
      );
  }
  return null;
}

export function getFilms() {
  if (filmsError) {
    return filmsError;
  }
  if (filmURLs) {
    // denormalize
    return filmURLs.map(url => objectsByURL[url]);
  }
  if (!fetchingFilms) {
    fetchingFilms = true;
    request('get', 'https://swapi.co/api/films/')
      .getBody('utf8')
      .then(JSON.parse)
      .then(
        response => {
          // normalise the response
          filmURLs = response.results.map(film => {
            objectsByURL[film.url] = film;
            return film.url;
          });
          fetchingFilms = false;
          onUpdate();
        },
        error => {
          filmsError = error;
          fetchingFilms = false;
          onUpdate();
        }
      );
  }
  return null;
}
