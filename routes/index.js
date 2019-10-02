const router = require('express').Router();
const PostRouter = require('./post');

router.use('/posts', PostRouter);

module.exports = router;