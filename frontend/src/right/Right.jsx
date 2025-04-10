import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import SendMessageForm from "./Type";
import useSendMessage from "../context/useSendMessage.jsx";
import userConversionStore from "../userstore/userConversion.js";
// import Loading from '../componnents/Loading/Loading.jsx'
import { useAuth } from "../context/AuthProvider";

function Right() {
  const { selectedConversion, setSelectedConversion } = userConversionStore();

  useEffect(() => {
    return () => setSelectedConversion(null); // Cleanup on unmount
  }, [setSelectedConversion]); // Dependency should be setSelectedConversion

  return (
    <div className="w-[70%] border border-black text-white bg-slate-950">
      {!selectedConversion ? (
        <Nochat />
      ) : (
        <>
          <ChatUser />
          <div style={{ maxHeight: "calc(88vh - 8vh)" }} className="py-2 overflow-y-auto">
            <Messages />
          </div>
          <SendMessageForm />
        </>
      )}
    </div>
  );
}

const Nochat = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-center text-semibold font-xl">
      Welcome {authUser.user.name}
      <br />
        Select a conversation to start a chat.
      </h1>
      {authUser?.name && <p>Welcome, {authUser.name}!</p>} {/* Replace recursive call with a simple message */}
    </div>
  );
};

export default Right;