import React from "react";
import userConversionStore from "../userstore/userConversion.js";

function User({user}) {
  const {selectedConversion, setSelectedConversion}=userConversionStore();
  const isselected=selectedConversion?._id===user._id;

  return (
    <div className={`hover:bg-slate-500 duration-300 ${isselected?"bg-slate-700":""}`} onClick={()=>setSelectedConversion(user)}>
    <div className="flex space-x-4 px-6 py-7 hover:bg-slate-600 duration-300 cursor-pointer ">
      <div className="avatar avatar-online">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1 className="font-bold">{user.name}</h1>
        <span>{user.email}</span>
      </div>
    </div>
    </div>
  );
}

export default User;
