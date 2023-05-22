const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res) => {
   res.render('login')
})

router.post('/', async (req, res) => {
   const { username, password } = req.body;
   const foundUser = await userModel.findAndValidate(username, password)
   if (foundUser) {
      req.session.user_id = foundUser._id;
      res.redirect('/secret')
   } else {
      res.send('Incorrect Username or Password')
   }
})

module.exports = router;