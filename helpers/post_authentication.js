require('dotenv').config();
const db = require('../database/models');

module.exports = {

    canProcessPost: async (req, res, next) => {
        const { id } = req.params;

        const post = await db.post.findByPk(id);

        if(!post) return res.status(400).json({ message: "Invalid post"});

        if(post.userId !== req.profile.id) 
            return res.status(403).json({message:"User not authorised to perform this action. Not your post."});
        
        req.post = post;

        next();
    }
}