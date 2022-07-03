const {Schema, model} = require('mongoose');

const chatSchema = {
	users: [
		{type: Schema.ObjectId, ref: 'Messages', required: true,},
		{type: Schema.ObjectId, ref: 'Messages', required: true,}
	],
	createdAt: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now,
	},
	messages: [{
		type: Schema.ObjectId,
		ref: 'Message'
	}],
};

module.exports = model('Chat', chatSchema);