const router = require('express').Router();
const { signup } = require('../controllers/AuthController');
const validator = require('../validators');

router.post('/signup', validator.userSignupValidator, signup);

module.exports = router;