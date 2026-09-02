const {body, validationResult} = require("express-validator");
const loginErrorHandling = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"Validation Error Occured ❌",
            errors: errors.array(),
        })
    }
    next();
};

const loginValidation = [
    body("email").trim().notEmpty().withMessage("Email is Required").bail().isEmail()
    .withMessage("Enter a Valid Email!"),
    body("password").trim().notEmpty().withMessage("Password is Required").bail().
    isLength({min:8, max:20}).withMessage("Password length must be 8-20 characters"),
    loginErrorHandling
];

module.exports = loginValidation;