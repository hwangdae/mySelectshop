import React, { FormEvent, useState } from "react";
import Send from "@/assets/Send.svg";
import axios from "axios";

interface PropsType {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: PropsType) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = "";
    if (message || imageUrl) {
      try {
        await axios.post("/api/chat", {
          text: message,
          image: imageUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="메세지를 입력해 주세요."
      />
      <div></div>
      <button>
        <Send />
      </button>
    </form>
  );
};

export default Input;
