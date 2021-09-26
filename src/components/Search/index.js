import React, { useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
const Search = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const handleSearch = (e) => {
    let trem = e.target.value;
    trem = trem.toLowerCase();
    setSearchTerm(trem);
    setSearchResults(
      products?.filter((product) => product.title.toLowerCase().includes(trem))
    );
  };
  const handleFocusLose = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };
  return (
    <div className=" relative flex items-center flex-grow cursor-pointer  rounded-md h-10 bg-blue-400  hover:bg-blue-500">
      <input
        onMouseOver={() => setShowResults(true)}
        // onBlur={() => handleFocusLose()}
        onFocus={() => setShowResults(true)}
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none"
        type="text"
      />
      {searchTerm == "" ? (
        <SearchIcon className="h-12 p-4 text-white" />
      ) : (
        <XIcon className="h-12 p-4 text-white" onClick={handleFocusLose} />
      )}

      {showResults && (
        <div
          onClick={() => setShowResults(true)}
          onMouseOver={() => setShowResults(true)}
          onMouseLeave={() => setShowResults(false)}
          className="absolute w-full bg-white bottom-0 z-10 rounded-md"
          style={{
            transform: "translateY(100%)",
            height: "auto",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {!!searchResults?.length ? (
            searchResults.map(({ id, title, price, category }) => (
              <Link href={`/product/${id}`}>
                <div
                  key={id}
                  className="p-2 mt-2 border-b-2 rounded-md bg-gray-100 hover:bg-indigo-100 hover:shadow-md "
                >
                  <h5 className="font-medium text-sm text-gray-600">{title}</h5>

                  <p className="text-xs text-gray-400">{category}</p>
                </div>
              </Link>
            ))
          ) : (
            <>
              {searchTerm && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No product found
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
