const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/AuthController');
const validator = require('../validators/user_validator');

router.post('/signup', validator.userSignupValidator, signup);
router.post('/signin', validator.userSigninValidator, signin);
router.get('/signout', signout);

module.exports = router;