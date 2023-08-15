import { useSelectUser } from "@/state/UserContext";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import React, { MouseEvent } from "react";

function UserBox({
  imageUrl,
  username,
  isSelected,
  handleWhoIsChild,
}: {
  imageUrl: string;
  username: string;
  isSelected: boolean;
  handleWhoIsChild: (ref: any) => void;
}) {
  const { dispatch } = useSelectUser();
  const inputRef = React.useRef<HTMLParagraphElement | null>(null);
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (isSelected) return;
    handleWhoIsChild(inputRef.current);
    dispatch({
      type: "SELECT_USER",
      payload: { username: username, socketId: null, imageUrl: imageUrl },
    });
  }
  return (
    <Card
      className={`user-box ${
        isSelected && "active"
      } hover:bg-light-background-tertiary dark:hover:bg-[#0006] dark:text-[#ccc]`}
      onClick={(e) => handleClick(e)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 82,
        borderRadius: 0,
        backgroundColor: "#0002",
        borderBlock: 0.1,
        borderBlockColor: "#0001",
        cursor: "pointer",
        flexShrink: "0",
      }}
    >
      <Avatar src={`${imageUrl}`} sx={{ marginLeft: 1 }} />

      <CardContent sx={{ width: "68%" }}>
        <Typography
          ref={inputRef}
          sx={{
            fontSize: "1.1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {username}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Lorem ipsum asdhfiouahsdfiuahsidufhaiuhsdf
        </Typography>
      </CardContent>

      <div className="flex flex-col items-end justify-center m-2 gap-1 h-full">
       { !isSelected &&  <div className={` flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full text-xs text-black`}>
          50
        </div>}
        <Typography
          variant="body2"
          sx={{ fontWeight: "light", alignSelf: "flex-end" }}
        >
          12:40 pm
        </Typography>
      </div>
    </Card>
  );
}
export default UserBox;
/*



*/
