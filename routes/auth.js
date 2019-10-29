const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/AuthController');
const { populateProfileObject } = require('../helpers/authentication');
const validator = require('../validators');

router.post('/signup', validator.userSignupValidator, signup);
router.post('/signin', validator.userSigninValidator, signin);
router.get('/signout', signout);

//for any route containing :userId, get the user and update the profile object
router.param('userId', populateProfileObject);

module.exports = router;