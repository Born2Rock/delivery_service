class Users {
	userModel;
  
	constructor() {
		try {
			this.userModel = require('../models/users');
		} catch (e) {
			console.log('Can\'t create "User" model');
		}
	}
  
	async create(userData) {
		try {
			userData = this.prepareUserData(userData);
			const userCreationResult = await this.userModel.create(userData);
			return this.formatCreationMessage(userCreationResult);
		} catch (err) {
			//throw Error(err);
			return Promise.reject(this.formatCreationError(err));
		}
	}
  
	async findByEmail(email) {
		return await this.userModel.findOne({email}).exec();
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
		};
	}
	
	formatCreationError(userCreationResult) {
		return {
			data: {
				userCreationResult
			},
			status: 'error',
		};
	}
  
	encodePwd(password) {
		let crypto;
		try {
			crypto = require('crypto');
			return crypto.createHash('md5').update(password).digest('hex');
		} catch (err) {
			console.log('crypto support is disabled!');
		}
	}
  
	prepareUserData(userData) {
		userData.passwordHash = this.encodePwd(userData.password);
		return userData;
	}
	
	async authenticate(email, pwd) {
		return this.findByEmail(email)
			.then(u => {
				if (!u) return null;
				if (!u || (u.passwordHash !== this.encodePwd(pwd))) {
					return {
						"error": "Неверный логин или пароль",
						"status": "error"
					}
				}
				return u;
				return {
					data: {
						id: u._id,
						email: u.email,
						name: u.name,
						contactPhone: u.contactPhone,
					},
					status: 'ok'
				}
			})
			.catch(err => {
				console.log(err)
			});
	}
	
}

module.exports = new Users();