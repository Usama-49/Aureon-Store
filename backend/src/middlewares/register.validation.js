const {body, validationResult} = require("express-validator");

const registerValidationErr = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"Validation Failed ❌",
            errors: errors.array()
        })
    };
    next();
};

const registerValidator = [
    body("email").trim().notEmpty().withMessage("Email is Required").bail().isEmail()
        .withMessage("Enter a Valid Email!"),
    body("password").trim().notEmpty().withMessage("Password is Required").bail().
        isLength({min:8, max:20}).withMessage("Password length must be 8-20 characters"),
    body("username").trim().notEmpty().withMessage("UserName is Required").bail().isLength({min:3, max:20})
        .withMessage("UserName must be 3 to 20 characters"),
    registerValidationErr
];

module.exports = registerValidator;