"use client";
import React from "react";
import UserBox from "./UserBox";
import { useFetch } from "@/hooks/useFetch";
import { Card, CardContent, Skeleton } from "@mui/material";

function UserList({ debouncedValue }: { debouncedValue: string }) {
  const [users] = useFetch("https://randomuser.me/api/?results=10");
  const SkeletonArray = Array.from({ length: 10 }, (_, i) => (
    <UserListSkeleton key={i} />
  ));

  const [filteredUsers, setFilteredUsers] =
    React.useState<Array<object> | null>();

  React.useEffect(() => {
    if (users)
      setFilteredUsers(() =>
        users.filter((user: any) =>
          debouncedValue.length === 0
            ? true
            : [...debouncedValue.toLowerCase().trim().split(" ")].some(
                (word) => {
                  if (
                    user.name.first.toLowerCase().includes(word) ||
                    user.name.last.toLowerCase().includes(word)
                  ) {
                    return true;
                  }
                  return false;
                }
              )
        )
      );
  }, [debouncedValue, users]);

  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const handleWhoIsChild = (el: any) => {
    setSelectedUser(el.textContent);
  };

  return (
    <>
      {filteredUsers ? (
        <div className="flex-1 flex flex-col max-h-[calc(100vh-122px)] overflow-y-scroll dark:bg-[#252525] bg-light-background-tertiary border-0 ">
          <div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: any, index: number) => (
                <UserBox
                  username={user.name.first + " " + user.name.last}
                  imageUrl={user.picture.large}
                  handleWhoIsChild={handleWhoIsChild}
                  isSelected={
                    user.name.first + " " + user.name.last === selectedUser
                  }
                  key={index}
                />
              ))
            ) : (
              <div className="h-[100px] w-full flex items-center justify-center dark:text-[#ccc] ">
                <span>No user found</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>{SkeletonArray}</>
      )}
    </>
  );
}

export default UserList;

function UserListSkeleton(): React.JSX.Element {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        borderRadius: 0,
        backgroundColor: "#0002",
        border: 0.1,
        borderBlockColor: "#0001",
        cursor: "pointer",
        flexShrink: "0",
      }}
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        sx={{ marginLeft: 1, backgroundColor: "#ccc" }}
      />

      <CardContent
        sx={{ width: "90%", display: "flex", flexDirection: "column" }}
      >
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1rem",
            backgroundColor: "#ccc",
            marginRight: "100px",
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1rem",
            backgroundColor: "#ccc",
            marginRight: "10px",
          }}
        />
      </CardContent>
    </Card>
  );
}
