const db = require('../database/models/');

module.exports = {

    getAllCommentsByUser: async (req, res) => {

        try {
            return await db.comment.findAll({ where:{ userId: req.params.id}});
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while fetching comments.',
                error
            });
        }
    },

    getAllCommentsByPost: async (req, res) => {

        try {
            return await db.comment.findAll({ where:{ postId: req.params.id}});
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while fetching comments.',
                error
            });
        }
    },

    getSingleComment: async (req, res) => {

    },

    addComment: async (req, res) => {

    },

    editComment: async (req, res) => {

    },

    deleteComment: async (req, res) => {

    }
}