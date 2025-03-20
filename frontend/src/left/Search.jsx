import React from "react";
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <div className="h-5vh">
      <div className="px-6 py-4">
        <form action="">
          <div className="flex space-x-5">
            <label className="border-2 border-gray-700 rounded-lg flex items-center gap-2 w-[80%] bg-slate-900 p-3">
              <input
                type="search"
                className="grow outline-none bg-slate-900"
                placeholder="Search"
              />
            </label>
            <button>
              <IoSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;

