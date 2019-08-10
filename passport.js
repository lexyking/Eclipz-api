const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_TOKEN
}, async (payload, done) => {
  try {
    //Find the user specified in token
    const user = await User.findById(payload.sub);

    //If user doesn't exist, handle it
    if (!user) {
      return done(null, false);
    }

    //Otherwise, return the user
    done(null, user);

  } catch (error) {
    done(error, false);
  }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    //Find the given user
    const user = await User.findOne({ email })

    //If not, handle it
    if (!user) {
      return done(null, false);
    }

    //check if the pwd is correct
    const isMatch = await user.isValidPassword(password);

    //If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    //otherwise, return the user
    done(null, user)
  } catch (error) {
    done(error, false);
  }
}))