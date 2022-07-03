const express = require('express');
const {Users} = require("../modules");
const router = express.Router();

router.post('/', async (req, res) => {
	const body = req.body;
	await Users.create(body).then(user => {
		res.status(200).json(user);
	}).catch(err => {
		res.status(500).json(err);
	});
});

router.get('/find', async (req, res) => {
	const {email} = req.body;
	const u = await UserModule.findByEmail(email);
	res.status(200).json(u);
});

module.exports = router;