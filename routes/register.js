const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res) => {
   res.render('register')
})

router.post('/', async (req, res) => {
   const { username, password } = req.body;

   const user = new userModel({ username, password })
   await user.save()
   req.session.user_id = user._id;
   res.redirect('/')
})

module.exports = router;