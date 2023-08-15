import React, { useEffect } from "react";
import io, { Socket } from "socket.io-client";
export default function useSocket(url: string): Array<Socket | null>{
  const [socket, setSocket] = React.useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io(url);
    setSocket(() => newSocket);
  }, [url]);
  return [socket]
}
