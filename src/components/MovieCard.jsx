import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      className="cursor-pointer hover:scale-102 transition-transform duration-300"
      onClick={() => onClick(movie)}
    >
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <h3 className="mt-2 text-lg font-semibold text-white text-center truncate">
        {movie.title || movie.name}
      </h3>
    </div>
  );
};

export default MovieCard;