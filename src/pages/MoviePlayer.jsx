import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Movie and TV endpoints
const MOVIE_ENDPOINTS = [
  { name: 'VidLink', url: 'https://vidlink.pro/movie/' },
  { name: 'VidSrc Dev', url: 'https://vidsrc.dev/embed/movie/' },
  { name: '111Movies', url: 'https://111movies.com/movie/' },
  { name: 'VidJoy', url: 'https://vidjoy.pro/embed/movie/' },
  { name: 'VidSrc IO', url: 'https://vidsrc.io/embed/movie/' },
  { name: 'VidSrc CC', url: 'https://vidsrc.cc/v2/embed/movie/' },
  { name: 'VidSrc XYZ', url: 'https://vidsrc.xyz/embed/movie/' },
];

const TV_ENDPOINTS = [
  { name: 'VidLink', url: 'https://vidlink.pro/tv/' },
  { name: 'VidSrc Dev', url: 'https://vidsrc.dev/embed/tv/' },
  { name: '111Movies', url: 'https://111movies.com/tv/' },
  { name: 'VidJoy', url: 'https://vidjoy.pro/embed/tv/' },
  { name: 'VidSrc IO', url: 'https://vidsrc.io/embed/tv/' },
  { name: 'VidSrc CC', url: 'https://vidsrc.cc/v2/embed/tv/' },
  { name: 'VidSrc XYZ', url: 'https://vidsrc.xyz/embed/tv/' },
];

const MoviePlayer = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState('movie');
  const [selectedServer, setSelectedServer] = useState(MOVIE_ENDPOINTS[0]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  // Fetch content details
  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        // Try fetching as a movie
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5136fa3a64bee07a483ab34d57a57f22`);
        setContent(movieResponse.data);
        setContentType('movie');
      } catch (movieError) {
        // If movie fetch fails, try fetching as a TV series
        try {
          const tvResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5136fa3a64bee07a483ab34d57a57f22&append_to_response=seasons`);
          setContent(tvResponse.data);
          setContentType('tv');
          fetchEpisodes(tvResponse.data.id, 1); // Fetch episodes for the first season by default
        } catch (tvError) {
          console.error('Failed to fetch content:', tvError);
        }
      }
    };

    fetchContentDetails();
  }, [id]);

  // Fetch episodes for a specific season
  const fetchEpisodes = async (tvShowId, seasonNumber) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonNumber}?api_key=5136fa3a64bee07a483ab34d57a57f22`);
      setEpisodes(response.data.episodes);
      setSelectedEpisode(1); // Reset to the first episode when the season changes
    } catch (error) {
      console.error('Failed to fetch episodes:', error);
    }
  };

  // Handle season change
  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    fetchEpisodes(content.id, seasonNumber);
  };

  // Handle episode selection
  const handleEpisodeSelect = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  // Construct video URL
  const videoUrl =
    contentType === 'tv'
      ? `${selectedServer.url}${id}/${selectedSeason}/${selectedEpisode}`
      : `${selectedServer.url}${id}`;

  if (!content) {
    return <div className="text-white text-center mt-10">Loading content...</div>;
  }

  return (
<div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
  {/* Server Selection Buttons */}
  <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-800 rounded-lg shadow-xl">
    {(contentType === 'tv' ? TV_ENDPOINTS : MOVIE_ENDPOINTS).map((server) => (
      <button
        key={server.name}
        onClick={() => setSelectedServer(server)}
        className={`px-5 py-2 rounded-lg text-lg font-semibold ${
          selectedServer.name === server.name ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-teal-600 transition duration-300`}
      >
        {server.name}
      </button>
    ))}
  </div>

  {/* Video Player Section */}
  <div className="w-full h-[60vh] bg-black rounded-3xl shadow-xl overflow-hidden mt-6 mx-auto max-w-6xl">
    <iframe
      src={videoUrl}
      width="100%"
      height="100%"
      allowFullScreen
      className="rounded-2xl"
      title={content.title || content.name}
    ></iframe>
  </div>

  {/* Content Details Section */}
  <div className="p-6 mt-8 bg-gray-800 rounded-3xl shadow-xl max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={content.poster_path ? `https://image.tmdb.org/t/p/w500${content.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={content.title || content.name}
        className="w-full md:w-80 rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold text-teal-400">{content.title || content.name}</h1>
        <p className="mt-4 text-gray-300 text-lg">{content.overview}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {content.genres?.map((genre) => (
            <span key={genre.id} className="px-4 py-2 bg-teal-600 rounded-full text-sm">{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  </div>



      {contentType === 'tv' && (
  <div className="p-6 mt-6 bg-gray-800 rounded-2xl shadow-xl max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Seasons & Episodes</h2>

    {/* Season Dropdown */}
    <select
      className="w-full p-2 rounded bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
      value={selectedSeason}
      onChange={(e) => handleSeasonChange(Number(e.target.value))}
    >
      {content.seasons.map((season) => (
        <option key={season.id} value={season.season_number}>
          {season.name}
        </option>
      ))}
    </select>

    {/* Episode List */}
{/* Episode List */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {episodes.map((episode) => (
    <div
      key={episode.id}
      onClick={() => handleEpisodeSelect(episode.episode_number)}
      className={`relative p-4 bg-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 transition duration-300 ${
        selectedEpisode === episode.episode_number ? 'ring-2 ring-teal-500' : ''
      }`}
    >
      {/* Episode Number */}
      <div className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {episode.episode_number}
      </div>

      {/* Episode Thumbnail */}
      <img
        src={
          episode.still_path
            ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
            : 'https://via.placeholder.com/300x169?text=No+Thumbnail'
        }
        alt={`Episode ${episode.episode_number}`}
        className="w-full h-auto rounded-lg mb-3"
      />

      {/* Episode Title */}
      <h3 className="text-sm font-semibold text-white truncate">{episode.name}</h3>
      {/* Episode Overview */}
      <p className="text-sm text-gray-300 mt-2 line-clamp-3">{episode.overview || 'No description available.'}</p>
    </div>
  ))}
</div>

        </div>
      )}
    </div>
  );
};

export default MoviePlayer;