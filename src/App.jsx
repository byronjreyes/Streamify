import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import TVShows from './pages/TVShows';
import MoviePlayer from './pages/MoviePlayer';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/watch/movie/:id" element={<MoviePlayer mediaType="movie" />} />
        <Route path="/watch/tv/:id" element={<MoviePlayer mediaType="tv" />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;