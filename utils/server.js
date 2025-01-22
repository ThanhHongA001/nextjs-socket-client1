import io from "socket.io-client";

const socket = io("http://localhost:3500", {
  query: { callerId: userId },
});

socket.on("connect", () => {
  console.log("Kết nối thành công tới server với ID người gọi:", userId);
});

socket.on("connect_error", (err) => {
  console.log("Lỗi kết nối:", err.message);
});
