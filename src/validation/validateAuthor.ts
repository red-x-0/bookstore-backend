import Joi from "joi";

const validateAuthor = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required(),

  nationality: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required(),

  image: Joi.string()
    .trim()
    .required(),
});

export default validateAuthor;
