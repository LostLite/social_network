const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../database/models/');
const { getUserByEmail } = require('../helpers/fetchUsers');

module.exports = {

    signup: async (req, res) => {
        try {

            const {name, email, password} = req.body;
            const userExists = await getUserByEmail(email);
            
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
    },

    signin: async (req, res) => {
        //find user based on email
        const {email, password} = req.body;
        const user = await getUserByEmail(email);
        //if error or no user
        if(!user) return res.status(401).json({message: 'Invalid login credentials'});

        //if user, authenticate
        if(!user.authenticate(password)) return res.status(401).json({message: 'Invalid login credentials'});
        
        //generate token with user id and secret
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("token",token, {expire: new Date() + 9999});
        const {id, name} = user;
        //return response with user and token to client
        return res.status(200).json({message: 'Successful Sign In', token, user: {id, name, email:user.email}});
    },

    signout: async (req, res) => {
        res.clearCookie("token");

        return res.status(200).json({message: 'Successfully signed out!'});
    }
}