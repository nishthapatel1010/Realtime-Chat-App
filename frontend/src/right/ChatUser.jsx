import React from "react";
import userConversionStore from "../userstore/userConversion.js";

function ChatUser() {
  const { selectedConversion } = userConversionStore();
  // console.log("selectechat", selectedConversion);

  // If selectedConversion is null, show a fallback UI
  // if (!selectedConversion) {
  //   return (
  //     <div className="flex space-x-3 pt-3 pl-3 pb-3 h-[8vh] bg-gray-900 hover:bg-gray-600 duration-300">
  //       <div>
  //         <div className="avatar avatar-online">
  //           <div className="w-14 rounded-full">
  //             <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  //           </div>
  //         </div>
  //       </div>
  //       <div>
  //         <h1 className="text-lg">No Chat Selected</h1>
  //         <span className="text-sm">Select a chat to start</span>
  //       </div>
  //     </div>
  //   );
  // }

  // Render when selectedConversion exists
  return (
    <div className="flex space-x-3 pt-3 pl-3 pb-3 h-[8vh] bg-gray-900 hover:bg-gray-600 duration-300">
      <div>
        <div className="avatar avatar-online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg">{selectedConversion.name}</h1>
        <span className="text-sm">Online</span>
      </div>
    </div>
  );
}

export default ChatUser;