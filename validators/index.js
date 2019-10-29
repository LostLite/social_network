const { body, sanitizeBody, validationResult } = require('express-validator');
const  myValidationErrors = require('../helpers/validationErrors');
exports.createPostValidator = [
    body('title',"Provide a suitable title for this post").not().isEmpty(),
    body('title',"Title should be 4 to 150 characters").isLength({
        min: 4, max: 150
    }),

    //body validation
    body('body', "Provide content for this post").not().isEmpty(),
    body('body', "Content cannot be less than 10 characters").isLength({
        min: 10
    }),

    sanitizeBody('notifyOnReply').toBoolean(),
    (req, res, next) => {
        myValidationErrors(req, res, next);
    }
];

exports.userSignupValidator = [
    //name is not null and between 4 to 10 characters
    body('name','Name is required').not().isEmpty(),
    body('name','Name has cannot be less that 3 characters long').isLength({
        min: 3
    }),

    //validate email
    body('email','Email is required').not().isEmpty(),
    body('email','Provide a valid email address').isEmail().normalizeEmail(),

    //check for password
    body('password','Password is required').not().isEmpty(),
    body('password')
    .isLength({
        min: 6
    })
    .withMessage('Password cannot be less than 6 characters long'),
    
    //check for errors
    sanitizeBody('notifyOnReply').toBoolean(),
    (req, res, next) => {
        myValidationErrors(req, res, next);
    }
];

exports.userSigninValidator = [
    //validate email
    body('email','Email is required').not().isEmpty(),
    body('email','Provide a valid email address').isEmail().normalizeEmail(),

    //check for password
    body('password','Password is required').not().isEmpty(),
    body('password')
    .isLength({
        min: 6
    })
    .withMessage('Password cannot be less than 6 characters long'),
    
    //check for errors
    sanitizeBody('notifyOnReply').toBoolean(),
    (req, res, next) => {
        myValidationErrors(req, res, next);
    }
]