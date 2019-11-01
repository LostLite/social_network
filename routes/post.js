const router = require('express').Router();
const { 
    getPosts, 
    getSinglePost, 
    createPost, 
    getPostsByUser, 
    updatePost,
    deletePost 
} = require('../controllers/PostController');
const { hasLoggedIn, populateProfileFromToken } = require('../helpers/user_authentication');
const { canProcessPost } = require('../helpers/post_authentication');
const validator = require('../validators/post_validator');
const singleImageUpload = require('../helpers/cloudinary');

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.get('/by/:userId', getPostsByUser);
router.post('/create', 
    hasLoggedIn, 
    validator.createPostValidator, 
    populateProfileFromToken, 
    singleImageUpload,
    createPost);
router.put('/:id', hasLoggedIn, validator.editPostValidator, populateProfileFromToken, canProcessPost, updatePost);
router.delete('/:id', hasLoggedIn, populateProfileFromToken, canProcessPost, deletePost);



module.exports = router;