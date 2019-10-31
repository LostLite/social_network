const db = require('../database/models');
const { getUserById } = require('../helpers/fetchUsers');

module.exports = {

    allUsers: async (req, res) =>{

        try {
            const users = await db.user.findAll({
                attributes: ['id','name','email']
            });

            return res.status(200).json({users});

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while fetching users',
                error
            });
        }
        
    },

    singleUser: async (req, res) => {
        return res.status(200).json({user: req.profile});
    },

    updateUser: async (req, res) => {

        try {
            const { id, name, password } = req.profile;
            const result = await db.user.update({ name, password }, {
                where: {id: Number(id)}
            });

            return res.status(201).json({message:'User saved', result})
            
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while updating user',
                error
            });
        }
        
    },

    deleteUser: async (req, res) =>{

        try {
            const { userId } = req.profile.id;

            await db.user.destroy({
                where: {
                    id: Number(userId)
                }
            });

            return res.status(201).json({message:'User deleted successfully'});

        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while deleting user',
                error
            });
        }
    }

}