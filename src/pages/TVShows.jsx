import { useEffect, useState } from 'react';
import { fetchTrendingTVShows } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';

const TVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const loadTVShows = async () => {
      try {
        const response = await fetchTrendingTVShows();
        setTVShows(response.data.results || []);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    loadTVShows();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Trending TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {tvShows.map((show) => (
          <MovieCard key={show.id} movie={show} onClick={setSelectedShow} />
        ))}
      </div>

      {/* TV Show Details Modal */}
      {selectedShow && (
        <MovieDetailsModal
          movie={selectedShow}
          onClose={() => setSelectedShow(null)}
          mediaType="tv"
        />
      )}
    </div>
  );
};

export default TVShows;