import axios from "axios";
import React, { use, useEffect } from "react";

export default function useAuth(username: string, password: string) {
  useEffect(() => {
    if (typeof window !== undefined) {
      axios
        .post("http://localhost:40001/api/login", { username, password })
        .then((res) => res.data)
        .then((data) => {
          document.cookie = `token=${data.token};`;
        });
    }
  }, [username, password]);
}
