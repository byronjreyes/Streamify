import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-red-500 transition">
          Streamify
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/popular" className="hover:text-red-500 transition">Popular</Link>
          <Link to="/top-rated" className="hover:text-red-500 transition">Top Rated</Link>
          <Link to="/tv-shows" className="hover:text-red-500 transition">TV Shows</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={handleSearchClick} className="hover:text-red-500 transition text-lg">
            🔍
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;