const mongoose = require('mongoose');
if (process.env.NODE_ENV !== "production") {
   require('dotenv').config()
}

const connectdb = () => {
   mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
         console.log("Connected to Mongo")
      })
      .catch(err => {
         console.log("Couldn't connect to Mongo")
         console.log(err)
      })
}

mongoose.set('strictQuery', false);
module.exports = connectdb;