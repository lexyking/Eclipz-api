const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

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
}))