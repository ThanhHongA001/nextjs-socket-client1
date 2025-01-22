"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

const socketConnection = io("http://localhost:3500", {
  secure: true,
  transports: ['websocket'],
  query: {
    callerId: "5678"
  },

});
export default function ChatPage() {
  const [serverId, setServerId] = useState("Server ID: localhost");
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {


    socketConnection.on("connect", () => {
      console.log("Kết nối thành công tới server với ID người gọi:");
    });

    socketConnection.on("send", (data) => {
      console.log("Nhận được tin nhắn từ server:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        `From ${data.fromId}: ${data.mess}`,
      ]);
    });

    // setSocket(socketConnection);

    // return () => {
    //   socketConnection.disconnect();
    // };
  });

  const handleSendMessage = () => {
    console.log("khanh99999","0000")
    let userFromId = "5678";
    let userToId = "5678";
    let mess = "khanh 8945789i";
    console.log("log 123", "from " + userFromId + " to " + userToId + " type " + mess);
    socketConnection.emit("send", {
      fromId: userFromId,
      toId: userToId,
      mess: mess
    });
  };

  return (
    <div className="container">
      <div className="user-info">
        <label>Your ID: </label>
        <input
          type="text"
          value={"1234"}
          readOnly
          className="user-id-input"
        />
        <button onClick={() => navigator.clipboard.writeText("1234")} className="copy-btn">Copy ID</button>
      </div>

      <div className="server-info">
        <p>{serverId}</p>
      </div>

      <div className="message-input">
        <label>Enter message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input-field"
        />
        <button onClick={handleSendMessage} className="send-btn">Send</button>
      </div>

      <div className="chat-box">
        <h3>Chat:</h3>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
