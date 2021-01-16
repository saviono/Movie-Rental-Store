const Joi = require('joi');
const mongoose =  require('mongoose'); 

const Customer = mongoose.model('Customer',new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
        },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
        }
}));


function validateCustomer(customerReqObj){
    
    const schema = Joi.object (
        {
        name: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
        }
    );

    return schema.validate(customerReqObj);
}

exports.Customer = Customer;
exports.validate = validateCustomer;