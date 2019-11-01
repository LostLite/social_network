const router = require('express').Router();
const { allUsers, singleUser, updateUser, deleteUser} = require('../controllers/UserController');
const { hasAuthorization, hasLoggedIn, populateProfile } = require('../helpers/user_authentication');
const validator = require('../validators/user_validator');

//for any route containing :userId, get the user and update the profile object
router.param('userId', populateProfile);

router.get('/', allUsers);
router.get('/:userId', hasLoggedIn, singleUser);
router.put('/:userId', hasLoggedIn, validator.userEditValidator, updateUser);
router.delete('/:userId', hasLoggedIn, deleteUser);

module.exports = router;