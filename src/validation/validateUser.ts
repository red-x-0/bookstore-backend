import Joi from "joi";

const validateRegisterUser = Joi.object({
  username: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_-]+$/) // Only allows letters, numbers, underscores, and dashes
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Ensures email format
    .required(),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/) // At least one letter and one number
    .required(),
  isAdmin: Joi.boolean().default(false),
});

const validateUser = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Ensures valid email format
    .required(),

  password: Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/) // At least one letter and one number
    .required(),
});

const validateUserUpdate = Joi.object({
  username: Joi.string()
  .trim()
  .min(3)
  .max(30)
  .pattern(/^[a-zA-Z0-9_-]+$/) // Only allows letters, numbers, underscores, and dashes
  .required(),
  email: Joi.string()
    .trim()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Ensures valid email format
    .required(),
});

export {
  validateUser, 
  validateRegisterUser,
  validateUserUpdate
};
