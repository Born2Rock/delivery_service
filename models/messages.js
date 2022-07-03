const {Schema, model} = require('mongoose');

const messagesSchema = {
	author: {
		type: Schema.ObjectId,
		ref: 'Users',
		required: true,
		unique: false,
	},
	text: {
		type: String,
		required: true,
		unique: false,
	},
	sentAt: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now,
	},
	readAt: {
		type: Date,
		required: false,
		unique: false,
	},
};

module.exports = model('Message', messagesSchema);