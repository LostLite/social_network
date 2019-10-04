const Post = require('../database/models/').Post;
const {validationResult} = require('express-validator');

module.exports = {
    
    createPost: async (req, res) => {
        try {
            const {title,body} = req.body;
            
            const newPost = await Post.create({title, body});

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
            const posts = await Post.findAll({
                attributes: ['id', 'title','body','createdAt']
            });
            return res.status(200).json({ posts });

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while creating the post',
                error
            });
        }
        
    },

    getSinglePost: async (req, res) => {

        try {
            
            const post = await Post.findByPk(req.params.id);

            if(!post) return res.status(400).json({ message: 'That post does not exist'});

            return res.status(200).json({
                post
            });

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while creating the post',
                error
            });
        }
    }

}