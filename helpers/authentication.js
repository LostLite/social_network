require('dotenv').config();
const expressJwt = require('express-jwt');
const { getUserById } = require('../helpers/fetchUsers');

module.exports = {
    
    hasLoggedIn: expressJwt({
        // if the token is valid, express-jwt appends the verified user id
        // to an auth key in the req object
        secret: process.env.JWT_SECRET,
        requestProperty: "auth"
    }),
    
    hasAuthorization: (req, res, next) => {
        const authorized = req.profile && req.auth && req.profile.id === req.auth.id;
        if(!authorized) 
            return res.status(403).json({message:'User is not authorized to perform this function'}); 
        
        next();
    },

    populateProfileObject: async (req, res, next, id) => {
        const user = await getUserById(id);
        if(!user) return res.status(400).json({message:'User not found'});
        
        req.profile = user; //add profile object in req with user info
        next();
    }
}