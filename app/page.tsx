'use client';

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socketConnection = io("http://localhost:3500", {
  secure: true,
  transports: ['websocket'],
  query: {
    callerId: "1", // Gán cứng callerId, điều chỉnh thành "2" trong client khác
  },
});

export default function ChatPage() {
  const [id, setId] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Lấy ID người dùng
    const generatedId = `user-${Math.floor(Math.random() * 10000)}`;
    setId(generatedId);

    // Kết nối server
    socketConnection.on("connect", () => {
      console.log("Kết nối thành công với server");
    });

    // Lắng nghe tin nhắn
    socketConnection.on("receive", (data) => {
      console.log("Nhận tin nhắn:", data);
      setMessages((prev) => [
        ...prev,
        `Từ ${data.fromId}: ${data.mess}`,
      ]);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && id) {
      const toId = "2"; // ID người nhận (thay đổi trong client khác)
      socketConnection.emit("send", {
        fromId: id,
        toId: toId,
        mess: input,
      });

      setMessages((prev) => [...prev, `Bạn: ${input}`]);
      setInput('');
    }
  };

  const copyId = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      alert('ID đã được sao chép!');
    }
  };

  return (
    <div className="container">
      <div className="user-info">
        <strong>ID của bạn:</strong> {id || "Đang tạo..."}
        <button onClick={copyId} style={{ marginLeft: '8px' }} disabled={!id}>
          Sao chép
        </button>
      </div>

      <div className="chat-box">
        <h3>Khung chat:</h3>
        <div style={{ marginTop: '8px', minHeight: '200px' }}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
}
