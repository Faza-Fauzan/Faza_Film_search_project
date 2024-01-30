
class Films {
  static searchFilms(keyword) {
    return fetch(`http://www.omdbapi.com/?apikey=e38b7731&s=${keyword}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.Response === 'True') {
            return Promise.resolve(responseJson.Search);
          } else {
            return Promise.reject(`${keyword} is not found`);
          }
        });
  }
}

export default Films;
