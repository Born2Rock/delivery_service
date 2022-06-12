class Users {
  UserModel;
  
  constructor() {
    try {
      this.UserModel = require('../models/users');
    } catch (e) {
      console.log('Can\'t create "User" model');
    }
  }
  
  async create(userData) {
    try {
      //TODO: validate
      userData = this.prepareUserData(userData);
      const userCreationResult = await this.UserModel.create(userData);
      return this.formatCreationMessage(userCreationResult);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  async findByEmail(email) {
    return await this.UserModel.findOne({email}).exec();
  }
  
  formatCreationMessage(userCreationResult) {
    return {
      data: {
        id: userCreationResult._id,
        email: userCreationResult.email,
        name: userCreationResult.name,
        contactPhone: userCreationResult.contactPhone,
      },
      status: 'ok',
    }
  }
  
  encodePwd(password) {
    let crypto;
    try {
      crypto = require('crypto');
      return crypto.createHash('md5').update(password).digest("hex");
    } catch (err) {
      console.log('crypto support is disabled!');
    }
  }
  
  prepareUserData(userData) {
    userData.passwordHash = this.encodePwd(userData.password);
    return userData;
  }
  
}

module.exports = new Users();