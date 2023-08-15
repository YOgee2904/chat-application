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
      payload: { username: username, socketId: null, imageUrl: imageUrl},
    });
  }
  return (
    <Card
      className={`user-box ${isSelected && "active"}`}
      onClick={(e) => handleClick(e)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 82,
        borderRadius: 0,
        backgroundColor: "#0002",
        border: 0.1,
        borderBlockColor: "#0001",
        cursor: "pointer",
        flexShrink: "0",
        "&:hover": {
          backgroundColor: "#0004 ",
        },
      }}
    >
      <Avatar src={`${imageUrl}`} sx={{ marginLeft: 1 }} />

      <CardContent sx={{ width: "68%" }}>
        <Typography
          ref={inputRef}
          sx={{
            color: "#ccc",
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
            color: "#ccc",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Lorem ipsum asdhfiouahsdfiuahsidufhaiuhsdf
        </Typography>
      </CardContent>

      <div className="flex flex-col items-end justify-center m-2 gap-1">
        <div className="flex items-center justify-center w-5 h-5 bg-blue-300 rounded-full text-xs">
          50
        </div>
        <Typography variant="body2" sx={{ color: "#ccc", fontWeight: "light" }}>
          12:40 pm
        </Typography>
      </div>
    </Card>
  );
}
export default UserBox;
/*



*/
