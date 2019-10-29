const router = require('express').Router();
const PostRouter = require('./post');
const AuthRouter = require('./auth');

router.use('/posts', PostRouter);
router.use('/auth', AuthRouter);

module.exports = router;