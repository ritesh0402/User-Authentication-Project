const mongoose = require('mongoose');
const connectdb = () => {
   mongoose.connect('mongodb://localhost:27017/authTest', { useNewUrlParser: true, useUnifiedTopology: true })
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