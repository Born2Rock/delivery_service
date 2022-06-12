const express = require('express');
const UserModule = require('../modules/users.class');
const router = express.Router();

router.post('/', async (req, res) => {
    const body = req.body;
    await UserModule.create(body).then(user => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/', async (req, res) => {

/*    const tmpUser = {
        //email: 'ssdf@sdf1sd222.com' + Math.random(),
        email: 'ssdf@sdf1sd222.com',
        passwordHash: 'test',
        name: 'test',
        name2: 'test',
        name3: 'test',
        contactPhone: 'test',
    }

    await UserModule.create(tmpUser).then(b => {
        console.log('b', b);
    });*/

    const u = await UserModule.findByEmail('ssd1f@sdf1sd222.com');
    console.log(u);

    res.json('ok');
});

router.get('/find', async (req, res) => {

/*    const tmpUser = {
        //email: 'ssdf@sdf1sd222.com' + Math.random(),
        email: 'ssdf@sdf1sd222.com',
        passwordHash: 'test',
        name: 'test',
        name2: 'test',
        name3: 'test',
        contactPhone: 'test',
    }

    await UserModule.create(tmpUser).then(b => {
        console.log('b', b);
    });*/

    const u = await UserModule.findByEmail('ssd1f@sdf1sd222.com');
    res.status(200).json(u);
});

module.exports = router;