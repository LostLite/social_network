const { validationResult } = require('express-validator');

const myValidationErrors = (req, res, next) => {
    //check for errors
    const errors = validationResult(req);
    //display errors as they happen
    if(!errors.isEmpty()){
        return res.status(400).json({validationErrors:errors.mapped()}) 
    }

    next();
}

module.exports = myValidationErrors;