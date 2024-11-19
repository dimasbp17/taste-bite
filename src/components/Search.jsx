import { IconButton } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setResults(response.data.meals || []);
    } catch (error) {
      console.error('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const closeSearch = () => {
    setShowInput(false);
    setQuery('');
    setResults([]);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Ketika tombol enter ditekan
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchMeals();
    }
  };

  return (
    <>
      <div>
        <IconButton
          variant="text"
          onClick={handleSearchClick}
        >
          <FaSearch size={20} />
        </IconButton>

        {/* Overlay */}
        {showInput && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-80"
            onClick={closeSearch}
          />
        )}

        {showInput && (
          <input
            type="search"
            className="absolute w-1/2 max-w-[800px] rounded-md py-3 px-4 transition-all duration-300 transform -translate-x-1/2 border left-1/2 top-20 border-abu focus:outline-none"
            placeholder="Search"
            style={{ zIndex: 10 }}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        )}

        {results.length > 0 && (
          <div
            className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white rounded-md p-4 shadow-lg w-3/4 max-w-[800px] z-20"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            <h2 className="mb-4 text-lg font-bold">Search Results:</h2>
            <ul className="space-y-3">
              {results.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-md">{meal.strMeal}</h3>
                    <p className="text-sm text-gray-600">{meal.strCategory}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && results.length === 0 && query.trim() && (
          <p className="absolute text-gray-300 transform -translate-x-1/2 top-40 left-1/2">
            No meals found.
          </p>
        )}
      </div>
    </>
  );
};

export default Search;
