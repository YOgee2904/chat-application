import React from 'react'
import ChatContainer from "./ChatContainer";
import ChatBar from "./ChatBar";
import { useSelectUser } from "@/state/UserContext";
import { MessageProvider } from "@/state/message-store/MessageStore";

function ChatContentContainer() {
  const { state, dispatch } = useSelectUser();

  if (state.selectUser.username)
    return (
      <MessageProvider>
        <>
          <ChatBar />
          <ChatContainer /> 
        </>
      </MessageProvider>
    );
  else
    return (
      <>
        
        <div className="flex justify-center items-center h-screen">
          <div className="text-[#fff] p-4 rounded-lg">
            <span className="text-lg">Select a user to start chatting!</span>
          </div>
        </div>
      </>
    );
}

export default ChatContentContainer;
