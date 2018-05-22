const request = require('then-request');

const subscribers = [];

exports.subscribe = function subscribe(fn) {
  subscribers.push(fn);
};

exports.unsubscribe = function unsubscribe(fn) {
  const index = subscribers.indexOf(fn);
  if (index !== -1) {
    subscribers.splice(index, 1);
  }
};

function onUpdate() {
  subscribers.forEach(fn => fn());
}

let fetchingFilms = false;
let filmURLs = null;
let filmsError = null;

const fetchingURL = {};
const objectsByURL = {};
const errorsByURL = {};

exports.getObject = function getObject(url) {
  if (objectsByURL[url]) {
    return {success: true, value: objectsByURL[url]};
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
          errorsByURL[url] = error;
          fetchingURL[url] = false;
          onUpdate();
        }
      );
  }
  if (errorsByURL[url]) {
    return {success: false, erorr: errorsByURL[url]};
  }
  return null;
};

exports.getFilms = function getFilms() {
  if (filmURLs) {
    // denormalize
    return {success: true, value: filmURLs.map(url => objectsByURL[url])};
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
  if (filmsError) {
    return {success: false, erorr: filmsError};
  }
  return null;
};
