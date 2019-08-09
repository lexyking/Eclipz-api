const JWT = require('jsonwebtoken');
const User = require('../models/user')

module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersController.signUp() called');
    const { email, password } = req.body;

    //Check if the email already exist
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use.' })
    }

    //Save the user
    const newUser = new User({ email, password });
    await newUser.save();

    //Create the token
    const token = JWT.sign({
      iss: 'eclipz-api',
      sub: newUser.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, 'eclipz-api-authentication');

    //Respond with token
    res.status(201).json({ token });

  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called')
  },

  secret: async (req, res, next) => {
    console.log('UsersController.secret() called')
  }
}