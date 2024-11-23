import { Server as SocketIO } from "socket.io";

// Export a function that sets up WebSocket logic
export default (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from React frontend
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    // Join a specific event chat room
    socket.on("joinEvent", (eventId) => {
      socket.join(eventId);
      console.log(`User joined event: ${eventId}`);
    });

    // Handle messages sent to an event
    socket.on("message", (data) => {
      io.to(data.eventId).emit("message", data);
      console.log(`Message sent to event ${data.eventId}:`, data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
