// src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("https://crypto-api-production-7139.up.railway.app", {
  autoConnect: false, // So you control when it connects
});

export default socket;
