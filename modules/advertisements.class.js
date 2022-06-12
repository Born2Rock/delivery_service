class Advertisements {
  
  advertisementModel;
  validFields = ['shortText', 'description', 'images', 'userId', 'createdAt', 'updatedAt', 'tags', 'isDeleted']
  
  constructor() {
    try {
      this.advertisementModel = require('../models/advertisements');
    } catch (e) {
      console.log('Can\'t create "Advertisement" model', e);
    }
  }
  
  async create(data){
    try {
      const advData = this.prepareAdvData(data);
      const creationResult = await this.advertisementModel.create(advData);
      console.log(creationResult);
      return this.formatCreationMessage(creationResult._doc);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  async remove(id){
    try {
      const filter = {_id: id};
      const update = {isDeleted: true}
      const updatedAdv = await this.advertisementModel.findOneAndUpdate(filter, update, {new: true});
      return updatedAdv;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  async find(params){
    const searchObject = {};
    Object.keys(params).forEach(key => {
      switch (key){
        case 'shortText':
          searchObject.shortText = new RegExp(`${params.shortText}`,'i');
          break;
        case 'description':
          searchObject.description = new RegExp(`${params.description}`,'i');
          break;
        case 'userId':
          searchObject.userId = params.userId;
          break;
        case 'tags':
          searchObject.tags = { $all: params.tags }
          break;
      }
    });
    try {
      console.log(searchObject);
      const searchResults = await this.advertisementModel.find(searchObject);
      return searchResults;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  prepareAdvData(data){
    /* TODO: any validation and preparation here */
    const validatedObject = {}
    Object.keys(data).forEach(key => {
      if (this.validFields.includes(key)) {
        validatedObject[key] = data[key]
      }
    });
    return validatedObject;
  }
  
  formatCreationMessage(userCreationResult) {
    return {
      data: {
        ...userCreationResult
      },
      status: 'ok',
    }
  }
  
}

module.exports = new Advertisements();
