import Joi from "joi";

const validateBook = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  author: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .min(3)
    .max(500)
    .required(),

  price: Joi.number()
    .precision(2)
    .positive()
    .required(),

  cover: Joi.string()
    .trim()
    .valid("hard cover", "soft cover")
    .required(),
});

export default validateBook;
