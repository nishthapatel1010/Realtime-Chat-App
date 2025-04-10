import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import useSendMessage from "../context/useSendMessage.jsx"; // Adjust path
import userConversionStore from "../userstore/userConversion.js";

function SendMessageForm() {
  const [messageText, setMessageText] = useState("");
  const { sendMessage, loading, error } = useSendMessage();
  const { selectedConversion } = userConversionStore();

  const handleSend = async (e) => {
    e.preventDefault(); // Prevent form refresh
    if (messageText.trim() && !loading && selectedConversion) {
     await sendMessage(messageText);
      setMessageText(""); // Clear input after sending
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex space-x-3 h-[10vh] text-center bg-gray-800"
    >
      <div className="w-[70%] mx-4 flex items-center">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={
            selectedConversion ? "Type here" : "Select a chat to start messaging"
          }
          className="border-2 border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900"
          disabled={loading || !selectedConversion}
        />
      </div>
      <button
        type="submit"
        className={`text-3xl text-white ${loading || !selectedConversion ? "opacity-50 cursor-not-allowed" : "hover:text-blue-400"}`}
        disabled={loading || !selectedConversion}
      >
        <VscSend />
      </button>
      {error && <p className="text-red-500 text-sm ml-2">{error.message}</p>}
    </form>
  );
}

export default SendMessageForm;