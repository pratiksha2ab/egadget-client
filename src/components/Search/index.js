import React, { useEffect, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // useEffect(async () => {
  //   const data = await fetch("http://localhost:5000/product");
  //   const searchItem = await data.json();
  //   setSearchData(searchItem);
  // }, []);
  console.log(searchData);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = searchData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleFocus = async () => {
    const data = await fetch("http://localhost:5000/product");
    const searchItem = await data.json();
    setSearchData(searchItem);
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleBlur = () => {
    setFilteredData([]);
  };
  return (
    <>
      {/* <div className="flex items-center max-w-xl mx-auto h-10 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500 relative"> */}
      <input
        className="p-2 text-sm md:text-base text-gray-700  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
        type="text"
        value={wordEntered}
        placeholder="Search for products..."
        onChange={handleFilter}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {filteredData.length === 0 ? (
        <SearchIcon className="h-12 p-4 text-white" />
      ) : (
        <XIcon className="h-12 p-4 text-white" onClick={clearInput} />
      )}
      {filteredData.slice(0, 15).length !== 0 && (
        <div className="h-30 max-w-sm w-full bg-white flex flex-col  mx-auto p-2 rounded-lg my-1 space-y-2 overflow-y-scroll overflow-x-hidden shadow-lg absolute top-10">
          {filteredData.map((value, key) => {
            return (
              <Link href={`/product/${value.id}`} key={value.id}>
                <a
                  target="_blank"
                  className="text-gray-600 text-md md:text-lg hover:text-green-500"
                >
                  {value.title}
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Search;
