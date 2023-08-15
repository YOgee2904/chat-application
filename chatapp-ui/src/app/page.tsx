"use client";
import ChatContentContainer from "@/components/Chat/ChatContentContainer";
import UserContainer from "@/components/Users/UserContainer";
import useSocket from "@/hooks/useSocket";
import React from "react";

export const SocketContext = React.createContext<any>(null);
function Page() {
  const [socket] = useSocket("http://localhost:4001");
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      <div className="flex h-screen w-screen bg-white text-black ">
        <div className=" min-w-[420px] w-1/4 bg-zinc-800 border-r-[.3px] border-gray-600 ">
          <UserContainer />
        </div>
        <div className="flex-1 min-w-[600px] bg-zinc-900 flex flex-col">
          <ChatContentContainer />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default Page;
