const db = require('../database/models');

module.exports = {
    getUserById: async id =>{
        return await db.user.findByPk(id);
    },

    getUserByEmail: async email => {

        return await db.user.findOne({
            where: {email}
        });
    }
}