const router = require('express').Router();
const { getPosts, getSinglePost, createPost } = require('../controllers/PostController');
const { hasLoggedIn, populateProfileObject } = require('../helpers/authentication');
const validator = require('../validators');

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/create', hasLoggedIn, validator.createPostValidator, createPost);

//for any route containing :userId, get the user and update the profile object
router.param("userId", populateProfileObject);

module.exports = router;