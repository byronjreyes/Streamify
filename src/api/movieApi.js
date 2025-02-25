import axios from 'axios';

// ✅ Base URLs for Movies and TV Shows
const BASE_URL = 'https://api.themoviedb.org/3';
const TV_BASE_URL = 'https://movieapp-zyqr.onrender.com/api/v2';

// ✅ API Key from .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`, // Secure API key usage
  },
};

// 🎬 Movie API Functions
export const fetchPopularMovies = async () =>
  axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

export const fetchNowPlayingMovies = async () =>
  axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);

export const searchMovies = async (query) =>
  axios.get(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);

export const getMovieDetails = async (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

export const fetchGenres = async () =>
  axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

// 📺 TV Show API Functions
export const fetchTVShows = async () =>
  axios.get(`${TV_BASE_URL}/tvshows`);

export const fetchPopularTVShows = async () =>
  axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

export const fetchTrendingTVShows = async () =>
  axios.get(`${BASE_URL}/trending/tv/day?language=en-US&api_key=${API_KEY}`);

export const fetchNowAiringTVShows = async () =>
  axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);

export const searchTVShows = async (query) =>
  axios.get(`${BASE_URL}/search/tv?query=${query}&api_key=${API_KEY}`);

export const getTVShowDetails = async (id) =>
  axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);

export const fetchTVGenres = async () =>
  axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
