const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const registerRoute = require('./routes/register')

mongoose.connect('mongodb://localhost:27017/authTest', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to Mongo")
   })
   .catch(err => {
      console.log("Couldn't connect to Mongo")
      console.log(err)
   })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

const sessionOpt = { secret: 'codeword', resave: false, saveUninitialized: false }
app.use(session(sessionOpt));

const requireLogin = (req, res, next) => {
   if (!req.session.user_id) {
      res.redirect('/login')
   } else {
      next()
   }
}

app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/register', registerRoute)

app.get('/', (req, res) => {
   res.send('home')
})

app.get('/secret', requireLogin, (req, res) => {
   res.render('secret')
})


app.listen(3000, (err) => {
   if (err) {
      console.log(`An Error Occured: ${err}`);
   } else {
      console.log("Serving your App")
   }
})