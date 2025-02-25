import React, { useState } from 'react';
import MovieCard from './MovieCard';

const Top10Slider = ({ movies, onClick }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Ensure only the top 10 movies are used
  const top10Movies = movies.slice(0, 10);

  console.log('Top 10 Movies:', top10Movies); // Debugging

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? top10Movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % top10Movies.length);
  };

  // Calculate the visible movies, ensuring it wraps around correctly
  const visibleMovies = [];
  for (let i = 0; i < 6; i++) {
    const index = (startIndex + i) % top10Movies.length;
    visibleMovies.push(top10Movies[index]);
  }

  console.log('Visible Movies:', visibleMovies); // Debugging

  // If there are no movies, return null or a fallback UI
  if (top10Movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="relative mt-4">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300 z-10"
      >
        &#8592;
      </button>

      {/* Movie Cards Slider */}
      <div className="flex overflow-hidden space-x-15 mx-12">
        {visibleMovies.map((movie, index) => {
          if (!movie) return null; // Skip if movie is undefined
          return (
            <div key={movie.id} className="relative flex-shrink-0 w-[170px] md:w-[220px] lg:w-[240px]">
              {/* Top 10 Ranking Number */}
              <span className="absolute top-2 left-2 text-4xl font-bold text-white-600 drop-shadow-lg">
                {((startIndex + index) % top10Movies.length) + 1}
              </span>
              <MovieCard movie={movie} onClick={onClick} />
            </div>
          );
        })}
      </div>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300 z-10"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Top10Slider;