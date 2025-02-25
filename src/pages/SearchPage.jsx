import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieDetailsModal';
import { searchMovies, searchTVShows, getMovieDetails, getTVShowDetails } from '../api/movieApi';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch movies and TV shows based on search query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [movieResponse, tvResponse] = await Promise.all([
          searchMovies(query),
          searchTVShows(query),
        ]);

        const movies = movieResponse?.data?.results || [];
        const tvShows = tvResponse?.data?.results || [];

        // Combine both arrays and sort by popularity or release date
        setSearchResults([...movies, ...tvShows]);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Detect if item is a movie or a TV show
  const handleItemClick = async (item) => {
    try {
      let response;
      if (item.media_type === 'tv' || item.first_air_date || item.name) {
        response = await getTVShowDetails(item.id);
      } else {
        response = await getMovieDetails(item.id);
      }

      if (response && response.data) {
        setSelectedItem({
          ...response.data,
          media_type: item.media_type || (item.first_air_date ? 'tv' : 'movie'), // Ensure media_type is set
        });
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to fetch item details:', err);
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search movies or TV shows..."
          className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-0 focus:border-b-2 focus:border-red-600 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Display Search Results */}
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {searchResults.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleItemClick(item)} // Open modal on click
            />
          ))}
        </div>
      ) : query ? (
        <p>No results found for "{query}".</p>
      ) : (
        <p>Start typing to search for movies or TV shows.</p>
      )}

      {/* Modal for Movie or TV Show */}
      {isModalOpen && selectedItem && (
        <MovieModal
          movie={selectedItem}
          onClose={closeModal}
          mediaType={selectedItem.media_type} // Pass media_type to the modal
        />
      )}
    </div>
  );
};

export default SearchPage;