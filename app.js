const express = require('express');
const app = express();
const session = require('express-session');
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const registerRoute = require('./routes/register')
const connectdb = require('./db');

connectdb();

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