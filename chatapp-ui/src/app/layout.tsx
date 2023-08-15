"use client";
import {
  SelectUserReducer,
  UserProvider,
  intialSelectUserState,
} from "@/state/UserContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useReducer } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    SelectUserReducer,
    intialSelectUserState
  );
  useEffect(() => {
    document.title = "Web chat";
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
