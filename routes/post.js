const router = require('express').Router();
const PostController = require('../controllers/Post');

router.get('/', PostController.getPosts)

module.exports = router;