import { useState } from "react";
import axios from "axios";
import userConversionStore from "../userstore/userConversion.js";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversion } = userConversionStore();

  const sendMessage = async (messageText) => {
    setLoading(true);
    setError(null);

    if (!selectedConversion || !selectedConversion._id) {
      setError(new Error("No chat selected"));
      setLoading(false);
      return;
    }

    if (!messageText.trim()) {
      setError(new Error("Message cannot be empty"));
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5002/api/message/send/${selectedConversion._id}`,
        { message: messageText },
        { withCredentials: true }
      );

      setMessages([...messages, data]); // Direct update to message list
    } catch (err) {
      console.error("Message Send Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}

export default useSendMessage;
