const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
    });

    socket.on('message', (data) => {
      io.to(data.groupId).emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};