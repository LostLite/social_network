const router = require('express').Router();
const { getPosts, getSinglePost, createPost } = require('../controllers/PostController');
const { hasLoggedIn, populateProfileFromToken } = require('../helpers/authentication');
const validator = require('../validators');
const singleImageUpload = require('../helpers/cloudinary');

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/create', 
    hasLoggedIn, 
    validator.createPostValidator, 
    populateProfileFromToken, 
    singleImageUpload,
    createPost);

module.exports = router;