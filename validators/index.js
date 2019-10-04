const { body, sanitizeBody, validationResult } = require('express-validator');
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
        //check for errors
        const errors = validationResult(req);
        //display errors as they happen
        if(!errors.isEmpty()){
            return res.status(400).json({validationErrors:errors.mapped()}) 
        }

    next();
    }
];