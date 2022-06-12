const express = require('express');
const {advertisements} = require('../modules');
const router = express.Router();

router.post('/', async (req, res)=>{
  const body = req.body;
  await advertisements.create(body)
    .then(adv => res.status(200).json(adv))
    .catch(err => res.status(500).json(err));
});

router.post('/find', async (req, res)=>{
  const body = req.body;
  await advertisements.find(body)
    .then(adv => res.status(200).json(adv))
    .catch(err => res.status(500).json(err));
});

router.get('/',(req, res)=>{

});

router.get('/:id', (req, res)=>{

});

router.delete('/:id', async (req, res)=>{
  const {id} = req.params;
  await advertisements.remove(id)
    .then(() => res.status(200).json({deleted: id}))
    .catch(err => res.status(500).json(err))
});

module.exports = router;