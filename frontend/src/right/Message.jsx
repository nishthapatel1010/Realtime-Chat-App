import React from "react";
function Message({ message }) {
  console.log("Message prop:", message); // Debug
  const authUser=JSON.parse(localStorage.getItem("userData"));
  // console.log("authuser",authUser)
  const itsme=message.senderId === authUser.user._id;
  const chatName=itsme? "chat-end" : "chat-start";
  const chatColor=itsme?"bg-blue-400":"";

  return (
    <div className={`chat ${chatName}`}>
      <div className={`chat-bubble text-gray-700 ${chatColor}`}>{message.message}</div>
    </div>
  );
}

export default Message;