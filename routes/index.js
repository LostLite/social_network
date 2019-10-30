const router = require('express').Router();
const PostRouter = require('./post');
const AuthRouter = require('./auth');
const UserRouter = require('./user');

router.use('/posts', PostRouter);
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

module.exports = router;