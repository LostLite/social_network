const db = require('../database/models/');

module.exports = {
    
    createPost: async (req, res) => {
        try {
            const {title,body, photo} = req.body;
            const newPost = await db.post.create({title, body, photo, userId:req.profile.id});

            return res.status(201).json({
                message: 'Post created successfully',
                newPost
            })

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while creating the post',
                error
            });
        }
        
    },

    getPosts: async (req, res) => {
        try {
            const posts = await db.post.findAll({
                attributes: ['id', 'title','body', 'photo','createdAt']
            });
            return res.status(200).json({ posts });

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while fetching the posts',
                error
            });
        }
        
    },

    getSinglePost: async (req, res) => {

        try {
            
            const post = await db.post.findByPk(req.params.id);

            if(!post) return res.status(400).json({ message: 'That post does not exist'});

            return res.status(200).json({
                post
            });

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while fetching the post',
                error
            });
        }
    },

    updatePost: async (req, res) => {

        try {
            const { id } = req.params;
            const { title, body, photo} = req.body;

            const post = await db.post.findByPk(id);

            if(!post) return res.status(400).json({ message: "Invalid post"});

            await db.post.update({title, body, photo}, {
                where: { id }
            });

            return res.status(201).json({message:"Post updated"});

        } catch (error) {

            return res.status(500).json({
                message: 'An error occurred while updating the post',
                error
            });
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params;

            const post = await db.post.findByPk(id);

            if(!post) return res.status(400).json({ message: "Invalid post"});

            await db.post.destroy({
                where: { id }
            });

            return res.status(201).json({message:"Post deleted"});

        } catch (error) {

            return res.status(500).json({
                message: 'An error occurred while deleting the post',
                error
            });
        }
    }

}