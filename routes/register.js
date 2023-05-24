const express = require('express');
const router = express.Router();
const userModel = require('../models/user');


router.route('/')
   .get((req, res) => {
      res.render('register')
   })
   .post(async (req, res) => {
      const { username, password } = req.body;

      const user = new userModel({ username, password })
      await user.save()
      req.session.user_id = user._id;
      res.redirect('/')
   })


module.exports = router;