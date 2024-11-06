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
            className="absolute w-1/2 max-w-[800px] py-3 px-4 transition-all duration-300 transform -translate-x-1/2 border left-1/2 top-20 border-abu focus:outline-none"
            placeholder="Search"
            style={{ zIndex: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default Search;
