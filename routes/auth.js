const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/AuthController');
const validator = require('../validators');

router.post('/signup', validator.userSignupValidator, signup);
router.post('/signin', validator.userSigninValidator, signin);
router.get('/signout', signout);

module.exports = router;