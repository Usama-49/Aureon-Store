const {body, validationResult} = require("express-validator");

const itemValidationErr = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"Validation Failed ❌",
            errors: errors.array()
        })
    };
    next();
}
const itemValidator = [
    body("name").trim().notEmpty().withMessage("Name is Required").isLength({min:3, max:100})
    .withMessage("Name should be 3 to 100 characters"),
    body("category").trim().notEmpty().withMessage("Category must be added").isLength({min:3, max:10})
    .withMessage("Category should be 3 to 10 characters"),
    body("stock").notEmpty().withMessage("Stock Quantity must be added").bail().isInt({min:0})
    .withMessage("Stock must be non-negative Number"),
    body("description").trim().notEmpty().withMessage("Must add Description").bail().isLength({min:30,max:500})
    .withMessage("Description should be 30 to 500 characters"),
    body("price").notEmpty().withMessage("Price must be added").isFloat().withMessage("Price can only be a Number"),
    itemValidationErr
];

module.exports = itemValidator;