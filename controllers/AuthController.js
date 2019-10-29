const db = require('../database/models/');

module.exports = {

    signup: async (req, res) => {
        try {

            const {name, email, password} = req.body;
            const userExists = await db.user.findOne({
                where: {email}
            });
            
            if(userExists) 
                return res.status(403).json({message: "That email address is already in use."});

            await db.user.create({name, email, password});
            return res.status(200).json({
                message: "Account Created Successfully. Please Login."
            });
            
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred while creating the user',
                error
            });
        }
    }
}