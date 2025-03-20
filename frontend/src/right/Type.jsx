import React from "react";
import { VscSend } from "react-icons/vsc";
function Type() {
  return (
    <div className="flex space-x-3 h-[10vh] text-center bg-gray-800">
      <div className="w-[70%] mx-4">
        <input
          type="text"
          placeholder="Type here"
          className="border-2 border-gray-700  flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-5"
        />
      </div>
      <button className="text-3xl">
        <VscSend />
      </button>
    </div>
  );
}

export default Type;
