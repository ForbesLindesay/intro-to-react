const subscribers = [];

function subscribe(fn) {
  subscribers.push(fn);
}

function unsubscribe(fn) {
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

async function getObject(url) {
  if (objectsByURL[url]) {
    return {success: true, value: objectsByURL[url]};
  }
  if (!fetchingURL[url]) {
    fetchingURL[url] = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText + ': ' + (await response.text()));
      }
      const data = await response.json();
      objectsByURL[url] = data;
    } catch (error) {
      errorsByURL[url] = error;
    }
    fetchingURL[url] = false;
    onUpdate();
  }
  if (errorsByURL[url]) {
    return {success: false, erorr: errorsByURL[url]};
  }
  return null;
}

async function getFilms() {
  if (filmURLs) {
    // denormalize
    return {success: true, value: filmURLs.map(url => objectsByURL[url])};
  }
  if (!fetchingFilms) {
    fetchingFilms = true;
    try {
      const response = await fetch('https://swapi.co/api/films/');
      if (!response.ok) {
        throw new Error(response.statusText + ': ' + (await response.text()));
      }
      const data = await response.json();
      // normalise the response
      filmURLs = data.results.map(film => {
        objectsByURL[film.url] = film;
        return film.url;
      });
    } catch (error) {
      filmsError = error;
    }
    fetchingFilms = false;
    onUpdate();
  }
  if (filmsError) {
    return {success: false, erorr: filmsError};
  }
  return null;
}

export default {getFilms, getObject, subscribe, unsubscribe};
