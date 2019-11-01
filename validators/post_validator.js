const { body, sanitizeBody } = require('express-validator');
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

exports.editPostValidator = [
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