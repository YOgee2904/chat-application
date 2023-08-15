import React from "react";
import UserTop from "./UserTop";
import UserList from "./UserList";

function UserContainer() {
  const [debouncedValue, setDebouncedValue] = React.useState<string>("");
  const handleChange = (value: string) => {
    setDebouncedValue(value);
  };
  return (
    <>
      <UserTop handleChange={handleChange} />
      <UserList debouncedValue={debouncedValue} />
    </>
  );
}

export default UserContainer;
