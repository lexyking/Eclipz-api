const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

//hash the pwd before it get save
userSchema.pre('save', async function (next) {
  try {

  } catch (error) {
    next(error);
  }
});
const User = mongoose.model('user', userSchema);

module.exports = User;
