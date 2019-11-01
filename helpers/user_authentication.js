require('dotenv').config();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { getUserById } = require('./fetchUsers');

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

    populateProfile: async (req, res, next, id) => {
        const user = await getUserById(id);
        if(!user) return res.status(400).json({message:'User not found'});
        
        req.profile = user; //add profile object in req with user info
        next();
    },

    populateProfileFromToken: async (req, res, next) => {
        //get the token from the header if present
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        token = token.split(' ')[1];
        if (!token) return res.status(401).send("User is not authorized to perform this function.");

        try {
            //if can verify the token, set req.user and pass to next middleware
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{

                if(err)return res.status(403).json({ message: err.message });

                const user = await getUserById(decoded.id);
                req.profile = user;

                next();
            });
            
        } catch (ex) {
            //if invalid token
            return res.status(400).json({ message:"Invalid token." });
        }
    }
}