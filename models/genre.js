const Joi = require('joi');
const mongoose =  require('mongoose'); 

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
        }
    });

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genreReqObj){
    
    const schema = Joi.object (
        {
        name: Joi.string().min(5).required()
        }
    );

    return schema.validate(genreReqObj);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;