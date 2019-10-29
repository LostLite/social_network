const router = require('express').Router();
const { allUsers, singleUser, updateUser, deleteUser} = require('../controllers/UserController');
const { hasAuthorization, hasLoggedIn, populateProfileObject } = require('../helpers/authentication');
const validator = require('../validators');

//for any route containing :userId, get the user and update the profile object
router.param('userId', populateProfileObject);

router.get('/', allUsers);
router.get('/:userId', hasLoggedIn, singleUser);
router.put('/:userId', hasLoggedIn, validator.userEditValidator, updateUser);
router.delete('/:userId', hasLoggedIn, deleteUser);

module.exports = router;