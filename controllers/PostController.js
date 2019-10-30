const db = require('../database/models/');

module.exports = {
    
    createPost: async (req, res) => {
        try {
            const {title,body} = req.body;
            
            const newPost = await db.post.create({title, body});

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
                attributes: ['id', 'title','body','createdAt']
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
    }

}