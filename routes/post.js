const router = require('express').Router();
const { getPosts, getSinglePost, createPost } = require('../controllers/PostController');
const validator = require('../validators');

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/create', validator.createPostValidator, createPost);

module.exports = router;