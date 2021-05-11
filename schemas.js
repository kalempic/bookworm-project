const Joi = require('joi');
module.exports.booksSchema = Joi.object({
    books: Joi.object({
        title:Joi.string().required(),
        image:Joi.string(),
        price: Joi.number().required().min(0),
        genre: Joi.string().required(),
        description: Joi.string().required()
    }).required()});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})


