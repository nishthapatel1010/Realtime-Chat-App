import React, { useEffect, useState } from "react";
import userConversionStore from "../userstore/userConversion.js";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversion } = userConversionStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      setError(null);
      // console.log("Selected Conversion:", selectedConversion);
      if (selectedConversion && selectedConversion._id) {
        try {
          const response = await axios.get(
            `http://localhost:5002/api/message/get/${selectedConversion._id}`,
            { withCredentials: true }
          );
          // Extract the 'messages' array from response.data, fallback to empty array
          const data = Array.isArray(response.data.messages) ? response.data.messages : [];
          // console.log("API Response:", response.data);
          // console.log("Extracted messages:", data);
          setMessages(data);
          // console.log("Messages after set:", userConversionStore.getState().messages);
        } catch (error) {
          setError(error);
          console.log("Error", error);
        }
      }
      setLoading(false);
    };
    getMessages();
  }, [selectedConversion, setMessages]);

  return { messages, loading, error };
}

export default useGetMessage;