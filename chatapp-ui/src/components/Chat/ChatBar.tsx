import { useSelectUser } from "@/state/UserContext";
import { Avatar } from "@mui/material";
import React from "react";


function ChatBar() {
  const { state, dispatch } = useSelectUser();
  return (
    <div className="h-[70px] bg-zinc-900 flex items-center text-white p-5 gap-4">
      <Avatar src={state.selectUser.imageUrl} />
      <span className="text-md">{state.selectUser.username}</span>
    </div>
  );
}

export default ChatBar;
