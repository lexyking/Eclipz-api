const express = require('express');
//express-promise-router is a package that handle try and catch under the hood
const router = require('express-promise-router')();
//const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');

const { validateBody, schemas } = require('../helpers/routesHelpers');
const UsersController = require('../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UsersController.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;