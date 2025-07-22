"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to CoWorkly! 👋</h1>
    </div>
  );
}
