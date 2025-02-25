import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const response = await fetchPopularMovies();
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    loadPopularMovies();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
        ))}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          mediaType="movie"
        />
      )}
    </div>
  );
};

export default Popular;