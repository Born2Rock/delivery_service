class Chat {
  
  usersModel;
  chatModel;
  messagesModel;
  userIdsSocketIdsMap = new Map();
  
  constructor() {
    try {
      this.usersModel = require('../models/users');
      this.chatModel = require('../models/chat');
      this.messagesModel = require('../models/messages');
  
/*      this.sendMessage(
        {
          author: '62a4a6c1eca6dc06682b0bca',
          receiver: '62af0bf72f242bf719d112e9',
          text: 'test',
        });*/
      
      //this.getHistory('62af482366d59c56b97af946');
      
    } catch (e) {
      console.log('Can\'t create chat or messages models');
    }
  }
  
  mapUserIdToSocketId(userId, socketId){
    this.userIdsSocketIdsMap.set(userId, socketId);
  }
  
  /*
    [x] 1.3.1 Функция "Получить чат между пользователями"
    const chat = await Chat.find(users);
    Аргумент функции [ObjectId, ObjectId] - id пользователей.
    Результатом работы функции должен быть Promise, который является объектом модели Chat или null.*/
  async find(users) {
    if (!await this.validateUsersPair(users)) return null;
    const chatObj = await this.chatModel.findOne({users});
    return (chatObj.length === 0) ? null : chatObj;
  }
  
  async create(users) {
    if (! await this.validateUsersPair(users)) return null;
    return await this.chatModel.create({users});
  }
  
  async validateUsersPair(users) {
    if (!users || !Array.isArray(users) || users.length !== 2) throw Error('Неверные аргументы метода find');
  
    const user1 = await this.usersModel.findById(users[0]);
    const user2 = await this.usersModel.findById(users[1]);
  
    if (!user1 || !user2) throw Error('Неверные ID пользователей');
  
    return true;
  }
  
  // [ ] 1.3.2 Функция "Отправить сообщение"
  async sendMessage(data) {
    //todo: validate data object;
    const userIdsPair = [data.author, data.receiver];
    const chatObject = await this.find(userIdsPair) || await this.create(userIdsPair);
  
    const message = await this.messagesModel.create({
      author: data.author,
      text: data.text,
    });

    const updatedChat = await this.chatModel.findOneAndUpdate(
      {_id: chatObject._id},
      {$push: {messages: message._id}},
    );
    
  }
  
  /*[ ] 1.3.3 Подписаться на новые сообщения в чате
  * ```js
    Chat.subscribe((data) => {});
    ```
    
    Функция `Chat.subscribe` должна принимать функцию обратного вызова.
    
    Каждый раз при добавлении сообщения функция обратного вызова должна вызываться со следующими параметрами.
    
    | название |    тип     | обязательное |
    | -------- | :--------: | :----------: |
    | chatId   | `ObjectId` |      да      |
    | message  | `Message`  |      да      |
    
    Оповещения должны быть реализованы через механизм `EventEmitter`
  * */
  subscribe(cb){
  }
  
//   [ ] 1.3.4 Функция "Получить историю сообщений чата"
/*
  ### 1.3.4 Функция "Получить историю сообщений чата"
  
  ```js
  const messages = await Chat.getHistory(id);
  ```
  
  Аргумент функции `ObjectId` - `_id` чата.
  
  Результатом работы функции должен быть `Promise`, который массивом объектов модели `Message`.
  */
  async getHistory(chatId){
    const messages = await this.chatModel.findById(chatId);
    //TODO .populate('Message')
    console.log(messages);
    return messages;
  }
  
  async socketGetHistory(socket, user2Id){
    try {
      const user1Id = ''; //TODO
      const chatId = await this.find([user1Id, user2Id]);
      const chatHistory = await this.getHistory(chatId);
      socket.emit("chatHistory", chatHistory);
    } catch (e) {
      throw Error('Can not get chat history');
    }
  }
  
  async socketSendMessage(socket, payload){
    
    const author = ''; // GET AUTHR ID FORM SOCKET ID
    const {receiver, text} = payload;
    
    this.sendMessage({
      author,
      receiver,
      text,
    });
    
    socket.emit("newMessage", message);

  }
  
  /*

    socket.on('allCommentsRequested', async (bookId) => {
      const allComments = await getAllComments(bookId);
      socket.emit('allCommentsSent', allComments);
    });
    
    socket.on('commentPosted', ({bookId, commentValue}) => {
      if (!commentValue) return;
      console.log('broadcsting...');
      addComment(bookId, commentValue).then(e => {
        //socket.emit("commentBroadcasted", {bookId, commentValue});
        socket.broadcast.emit("commentBroadcasted", {bookId, commentValue});
      });
    });
    
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
  */
  
  
  
  
}

module.exports = new Chat();