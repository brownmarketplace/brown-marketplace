import React from "react";

const Search = (props) => {
  return (
        <div className='search-container'>
          <input type="text" id="searchInput" placeholder="Search..." />
          <div id='submitsearch'>
          </div>
        </div>
  );
};

export default Search;
