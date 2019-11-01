const { body, sanitizeBody } = require('express-validator');
const  myValidationErrors = require('../helpers/validationErrors');

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

exports.userEditValidator = [
    body('name','Name is required').not().isEmpty(),
    body('name','Name has cannot be less that 3 characters long').isLength({
        min: 3
    }),

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