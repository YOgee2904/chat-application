import { SocketContext } from "@/app/page";
import React from "react";
import InputBox from "../Input/InputBox";
import { useMessage } from "@/state/message-store/MessageStore";
import MessageBox from "../Message/MessageBox";
import { ArrowBack, ArrowDownward } from "@mui/icons-material";

function ChatContainer() {
  const scrollDown = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { socket } = React.useContext(SocketContext);
  const { state, dispatch } = useMessage();
  React.useEffect(() => {
    if (scrollDown.current) {
      scrollDown.current.addEventListener("click", () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
  });
  React.useEffect(() => {
    socket.on("message", (message: string) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          messages: [...state.messages, { isUser: false, text: message }],
        },
      });
    });
  });

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [state.messages]);
  function handleMessage(message: string, ref: any) {
    if (message.trim() === "") return;
    ref.current.value = "";
    socket.emit("message", message);
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        messages: [...state.messages, { isUser: true, text: message }],
      },
    });
  }
  return (
    <>
      <div
        className="flex-1  overflow-y-scroll flex flex-col p-3 bg-[#252525]"
        ref={containerRef}
      >
        {state.messages.map((message, index) => (
          <MessageBox
            message={message.text}
            isUser={message.isUser}
            key={index}
          />
        ))}
        <div
          ref={scrollDown}
          className="flex justify-center items-center absolute bottom-[85px] right-4 rounded-full bg-[#252525] w-10 h-10 text-[#ccc] cursor-pointer"
        >
          <ArrowDownward />
        </div>
      </div>
      {/* rounded arrow to move down */}
      <InputBox handleMessage={handleMessage} />
    </>
  );
}

export default ChatContainer;
