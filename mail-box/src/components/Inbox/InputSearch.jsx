// import React from 'react'

function InputSearch() {
  return (
    <header className="flex  items-center w-full bg-violet-500 text-white h-18 py-2 pl-4">
      <h1 className="text-3xl font-bold mr-16">yahoo<span className="text-blue-700 italic">!</span>mail</h1>
      <div className="flex justify-center ml-4 w-2/3">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow p-2 rounded-lg outline-none text-black placeholder-gray-500"
        />
        <button className="ml-2 p-2 bg-white text-violet-500 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default InputSearch;
