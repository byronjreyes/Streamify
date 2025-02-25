import { useNavigate } from 'react-router-dom';

const MovieDetailsModal = ({ movie, onClose, mediaType }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  // Construct image URL
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  // Handle Watch Now button click
  const handleWatchNow = () => {
    if (mediaType === 'tv') {
      navigate(`/watch/tv/${movie.id}`); // Redirect to TV show watch page
    } else {
      navigate(`/watch/movie/${movie.id}`); // Redirect to movie watch page
    }
  };

  
  return (
    <div className="fixed inset-0 bg-opacity-70 backdrop-blur-2xl flex justify-center items-center z-50 p-4">
      <div className="bg-[#141414] bg-opacity-95 p-6 rounded-3xl shadow-2xl w-full max-w-lg mx-auto border border-gray-700 transition-transform transform hover:scale-105 duration-300">
        {/* Movie/Show Poster */}
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="rounded-lg w-full h-auto object-contain max-h-100 shadow-lg border border-gray-800"
        />

        {/* Movie/Show Title and Overview */}
        <h2 className="text-2xl font-bold text-white mt-4 text-center">
          {movie.title || movie.name}
        </h2>
        <p className="text-gray-300 mt-3 text-sm leading-relaxed text-center">
          {movie.overview && movie.overview.length > 150
            ? movie.overview.substring(0, 150) + '...'
            : movie.overview || 'No overview available.'}
        </p>

        {/* Additional Details for TV Shows */}
        {mediaType === 'tv' && (
          <div className="mt-4 text-center text-gray-400">
            <p>
              {movie.number_of_seasons} Season{movie.number_of_seasons !== 1 ? 's' : ''}
            </p>
            <p>
              {movie.number_of_episodes} Episode{movie.number_of_episodes !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-transparent border border-gray-500 hover:bg-gray-700 text-white rounded-md font-semibold transition duration-200 ease-in-out"
          >
            Close
          </button>
          <button
            onClick={handleWatchNow}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-transform transform hover:scale-105 duration-200 ease-in-out"
          >
            ▶️ Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;