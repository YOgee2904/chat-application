"use client";
import React, { useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";


function InputBox({
  handleMessage,
}: {
  handleMessage: (message: string, ref: any) => void;
}) {

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  function adjustTextareaHeight() {
    if (!textareaRef.current) return;
    if (textareaRef.current.scrollHeight > 77) {
      return (textareaRef.current.style.height = "77px");
    } 
    textareaRef.current.style.height = 'auto';
  }

  function handleSubmit() {
    if (textareaRef.current?.value) {
      handleMessage(textareaRef.current?.value, textareaRef);
      textareaRef.current.value = "";
      textareaRef.current.focus();
      adjustTextareaHeight();
    }
  }
  function handleKeyDown(e: any) {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      textareaRef.current && (textareaRef.current.value += "\n");
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex justify-center items-center bottom-0 w-full dark:bg-zinc-900 p-2">
      <div id="file-container">
        <input id="file" type="file" multiple />
        <label htmlFor="file" id="file-button">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M283.429,242.957v159.329 h-54.857V242.957H122.704l133.307-133.242l133.275,133.242H283.429z"></path>
                </g>
              </g>
            </g>
          </svg>
        </label>
      </div>
      <textarea
      className="resize-none whitespace-pre-wrap max-h-[100px] w-4/5 p-4 mx-3 my-1 text-base rounded-md outline-none dark:bg-[#252525] dark:text-[#cecece]"
        ref={textareaRef}
        name="textBox"
        id=""
        rows={1}
        onChange={adjustTextareaHeight}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        placeholder="Type a message..."
      ></textarea>
      <SendIcon
        onClick={handleSubmit}
        sx={{ width: 32, height: 32, fill: "#ccc"}}
      />
    </div>
  );
}

export default InputBox;
