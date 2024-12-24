const key = import.meta.env.VITE_TMDB_KEY;

const baseURL = "https://api.themoviedb.org/3";

const endpoints = {
  popular: `${baseURL}/movie/popular?api_key=${key}`,
  topRated: `${baseURL}/movie/top_rated?api_key=${key}`,
  upcoming: `${baseURL}/movie/upcoming?api_key=${key}`,
  nowPlaying: `${baseURL}/movie/now_playing?api_key=${key}`,
  search: `${baseURL}/search/movie?api_key=${key}&query=`,
  comedy: `${baseURL}/discover/movie?api_key=${key}&with_genres=35&query=comedy&language=en-US&page=1&include_adult=false`,
  trending: `${baseURL}/movie/popular?api_key=${key}&language=en-US&page=2`,
};

export function createImageUrl(filename, size){
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

export default endpoints;
