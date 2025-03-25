"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const res = await axios.get(`/api/chat`);
      return res.data;
    },
    refetchInterval: 1000,
  });
  console.log(data);
  return (
    <main>
      <div>
        <section>Contact Component</section>
        <section>Chat Component</section>
      </div>
    </main>
  );
};

export default ChatPage;
