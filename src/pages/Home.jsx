import { useEffect, useState } from 'react';
import {
  fetchPopularMovies,
  fetchTrendingTVShows,
  searchMovies
} from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import Top10Slider from '../components/Top10Slider';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Load movies and trending TV shows on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const movieRes = await fetchPopularMovies();
        const tvRes = await fetchTrendingTVShows();

        setMovies(movieRes.data.results || []);
        setTVShows(tvRes.data.results || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    loadContent();
  }, []);

  // ✅ Auto-slide every 10 seconds for movies
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [movies]);

  // ✅ Search for movies
  const handleSearch = async (query) => {
    try {
      const response = await searchMovies(query);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // ✅ Watch action for movies and TV shows
  const handleWatch = () => {
    if (!selectedMovie) return;
    const isTVShow = selectedMovie.first_air_date !== undefined;
    const id = selectedMovie.id;

    const watchUrl = isTVShow
      ? `https://vidsrc.xyz/embed/tv/${id}`
      : `https://vidsrc.xyz/embed/movie/${id}`;

    window.open(watchUrl, '_blank');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">

      <div className="p-6">
        {/* 🔥 Most Watched Section */}
        {movies.length > 0 && (
          <div
            className="relative w-full h-[500px] rounded-lg overflow-hidden mb-8"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[currentSlide].backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
              <div className="max-w-lg">
                <h2 className="text-4xl font-bold">{movies[currentSlide].title}</h2>
                <p className="mt-2 text-sm text-gray-300 truncate whitespace-normal break-words max-h-44 leading-snug">
                  {movies[currentSlide].overview || 'No description available.'}
                </p>
                <button
                  onClick={() => setSelectedMovie(movies[currentSlide])}
                  className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔝 Top 10 Section */}
        <h2 className="mt-6 text-2xl font-bold">Top 10 Content Today</h2>
        <Top10Slider movies={movies} onClick={setSelectedMovie} />

        {/* 🔥 What's Trending Today */}
        <h2 className="mt-6 text-2xl mb-6 font-bold">What's Trending Today</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>

        {/* 📺 Trending TV Shows */}
        <h2 className="mt-6 text-2xl font-bold">Trending TV Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tvShows.map((show) => (
            <MovieCard key={show.id} movie={show} onClick={setSelectedMovie} />
          ))}
        </div>

        {/* 🎬 Movie/TV Details Modal */}
        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onWatch={handleWatch}
          />
        )}
      </div>

{/* 🔻 Footer */}
<footer className="bg-gray-800 text-gray-400 p-4 mt-8">
  <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
    <p>&copy; {new Date().getFullYear()} Streamify. All rights reserved.</p>
    <a 
      href="https://github.com/byronjreyes" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="mt-2 hover:text-white transition"
    >
      Developed by Byron Reyes
    </a>
  </div>
</footer>



    </div>
  );
};

export default Home;
