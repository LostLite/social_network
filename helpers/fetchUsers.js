const db = require('../database/models');

module.exports = {
    getUserById: async id =>{
        return await db.user.findByPk(id, {
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });
    },

    getUserByEmail: async email => {

        return await db.user.findOne({
            where: {email}
        });
    }
}