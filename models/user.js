const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      requires: [true, 'Username cannot be blank']
   },
   password: {
      type: String,
      requires: [true, 'Username cannot be blank']
   }
})

userSchema.statics.findAndValidate = async function (username, password) {
   const foundUser = await this.findOne({ username });
   return await bcrypt.compare(password, foundUser.password) ? foundUser : false;
}

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12)
   }
   next()
})


module.exports = mongoose.model('User', userSchema)