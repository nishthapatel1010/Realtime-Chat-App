import React from "react";
import Search from "./Search";
import User from "./User";

function Left() {
  return <div className="w-[30%] text-white bg-black">
  <>
  <h1 className="font-bold text-3xl p-2 px-11" >Chats</h1>
    <Search />
    <hr />
    <User />
  </>
  </div>;
}

export default Left;
