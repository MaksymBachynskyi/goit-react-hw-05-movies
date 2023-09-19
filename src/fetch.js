import axios from 'axios';
const myKey = '8701185ffde4f92f44c0abf5011b977c';
axios.defaults.baseURL = 'https://api.themoviedb.org/';
export async function get() {
  const elements = await axios.get(`3/movie/popular?api_key=${myKey}`);
  return elements.data;
}
export async function getId(id) {
  const element = await axios.get(`3/movie/${id}?api_key=${myKey}`);
  return element;
}
export async function getByName(name) {
  const element = await axios.get(
    `3/search/movie?query=${name}&include_adult=false&language=en-US&page=1&api_key=${myKey}`
  );
  return element.data;
}

export async function getCast(id) {
  const element = await axios.get(
    `3/movie/${id}/credits?page=1&api_key=${myKey}`
  );
  return element;
}
export async function getReviews(id) {
  const element = await axios.get(
    `3/movie/${id}/reviews?page=1&api_key=${myKey}`
  );
  return element;
}
