const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');
const usersControl = require('../controllers/users');

router.route('/register')
       .get( usersControl.renderRegister)
       .post(catchAsync(usersControl.register));

router.route('/login')
       .get( usersControl.renderLogin)
       .post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersControl.login)


router.get( '/logout', usersControl.logout);


module.exports = router;
