const JWT = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const signToken = user => {
  return JWT.sign({
    iss: 'eclipz-api',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.SECRET_TOKEN);
}

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

    //Generate the token
    const token = signToken(newUser);

    //Respond with token
    res.status(201).json({ token });

  },

  signIn: async (req, res, next) => {
    console.log('UsersController.signIn() called')
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here in the secret place');
    res.json({ secret: "resource" })
  }
}