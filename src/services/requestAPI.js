const requestAPI = (url) => (fetch(url)
  .then((response) => response.json())
  .catch((error) => error));

export default requestAPI;
