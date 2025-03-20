import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

function Logout() {
  return (
    <div className="w-[4%] border border-black text-white bg-slate-950 flex flex-col justify-end">
    <div className="p-3 align-bottom">
      <button>
        <RiLogoutBoxLine className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" />
      </button>
    </div>
    </div>
  );
}

export default Logout;
