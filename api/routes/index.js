const router = require('express').Router();
const PostRoutes = require('./post');

router.use('/posts', PostRoutes);

module.exports = router;