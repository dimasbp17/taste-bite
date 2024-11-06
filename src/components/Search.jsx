import { IconButton } from '@material-tailwind/react';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [showInput, setShowInput] = useState(false);

  const handleSearchClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const closeSearch = () => {
    setShowInput(false);
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
            className="absolute left-0 w-full p-2 transition-all duration-300 border top-20 border-abu focus:outline-none"
            placeholder="Search"
            style={{ zIndex: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default Search;
