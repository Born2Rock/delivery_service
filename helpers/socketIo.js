const {Chat} = require("../modules");
console.log('io');
const wrapIo =function wrapIo(io){
  io.on('connection', (socket) => {
    
    console.log(io);
    
    if (socket.request.user) {
      const userId = socket.request.user.id;
      const socketId = socket.id;
      Chat.mapUserIdToSocketId(userId, socketId);
    }
    
    /*	socket.on('whoami', (cb) => {
      cb(socket.request.user ? socket.request.user.username : '');
    });
    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();*/
    
    socket.on('getHistory', (user2Id) => {
      Chat.socketGetHistory(socket, user2Id);
    });
    
    socket.on('sendMessage', (payload) => {
      console.log('got sendMessage with payload:');
      console.log(payload);
      Chat.socketSendMessage(socket, payload);
    });
    
  });
}

module.exports = wrapIo;