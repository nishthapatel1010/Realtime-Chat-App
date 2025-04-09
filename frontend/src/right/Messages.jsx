import React from "react";
import Message from "./Message";
import useGetMessage from "../context/useGetMessage.jsx";
import Loading from "../componnents/Loading/Loading.jsx";

function Messages() {
  const { messages, loading, error } = useGetMessage();
  // console.log("Messages before render:", messages);
  console.log("Is array?", Array.isArray(messages), "Length:", messages?.length);

  if (loading) {
    return (
      <div style={{ minHeight: "calc(88vh - 8vh)" }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "calc(88vh - 8vh)" }}>
        <p className="text-center font-sans mt-[20%]">Error: {error.message}</p>
      </div>
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div style={{ minHeight: "calc(88vh - 8vh)" }}>
        <p className="text-center font-sans mt-[20%]">Say! Hi</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(88vh - 8vh)" }}>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}

export default Messages;