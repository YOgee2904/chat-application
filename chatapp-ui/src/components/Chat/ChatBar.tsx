import { useSelectUser } from "@/state/UserContext";
import { Avatar } from "@mui/material";
import React from "react";


function ChatBar() {
  const { state, dispatch } = useSelectUser();
  return (
    <div className="h-[70px] dark:bg-zinc-900 bg-light-background-primary flex items-center dark:text-[#ccc]  p-5 gap-4">
      <Avatar src={state.selectUser.imageUrl} />
      <span className="text-md">{state.selectUser.username}</span>
    </div>
  );
}

export default ChatBar;
