import React, { useRef } from "react";

function MessageBox({ isUser, message }: { isUser: boolean; message: string }) {
  const messageRef = useRef<HTMLDivElement>(null);
  const showMore = useRef<HTMLSpanElement>(null);
  //shrink the height of the message box if the message is too long and provide link to show the full message
  React.useEffect(() => {
    if (messageRef.current) {
      if (messageRef.current.offsetHeight > 250) {
        messageRef.current.style.height = "250px";
        messageRef.current.style.overflow = "hidden";
        showMore.current?.style.setProperty("display", "block");
        showMore.current?.addEventListener("click", () => {
          messageRef.current?.style.setProperty("height", "auto");
          messageRef.current?.style.setProperty("overflow", "auto");
          showMore.current?.style.setProperty("display", "none");
        });
      } else {
        showMore.current?.style.setProperty("display", "none");
      }
    }
  }, []);

  return (
    <div
      className={` ${
        isUser ? "self-end" : "self-start"
      } flex items-center justify-center p-3 py-2 rounded-md bg-zinc-900 max-w-[50%] text-[#ccc] my-[2px] text-[15px]`}
    >
      <div ref={messageRef} className="whitespace-pre-wrap relative">
        {message}
        <span
          className="absolute text-[#ccc] bottom-0 right-0 bg-zinc-900 hover:underline cursor-pointer text-xs w-full text-end "
          ref={showMore}
        >
          show more
        </span>
      </div>
    </div>
  );
}

export default MessageBox;
