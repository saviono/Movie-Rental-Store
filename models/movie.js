const Joi = require('joi');
const mongoose =  require('mongoose'); 
const {genreSchema} = require('./genre');
const Movie = mongoose.model('Movie', new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
        },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movieReqObj){
    const schema = Joi.object (
        {
        name: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
        }
    );

    return schema.validate(movieReqObj);
}

exports.Movie = Movie;
exports.validate = validateMovie;