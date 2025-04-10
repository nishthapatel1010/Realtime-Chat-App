import React from "react";

function Message({ message }) {
  // Parse the authenticated user from localStorage
  const authUser = JSON.parse(localStorage.getItem("userData"));

  // Debug logs to verify data
  // console.log("Message prop:", JSON.stringify(message, null, 2));
  // console.log("authUser:", JSON.stringify(authUser, null, 2));
  // console.log("message.sender:", message.sender);
  // console.log("authUser.user._id:", authUser.user._id);

  // Check if the message is from the authenticated user
  const itsMe = message.sender === authUser.user._id;
  // console.log("itsMe:", itsMe);

  // Determine alignment and styling
  const chatAlignment = itsMe ? "chat-end self-end" : "chat-start self-start"; // Explicit alignment
  const chatColor = itsMe ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"; // Sender blue, receiver gray

  return (
    <div className={`chat ${chatAlignment} mb-2 w-full`}>
      <div className={`chat-bubble ${chatColor} p-2 rounded-lg max-w-xs`}>
        {message.message || "No content"}
      </div>
    </div>
  );
}

export default Message;