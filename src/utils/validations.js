import Joi from "joi";

/**
 * Validation schema for user creation or registration.
 * 
 * Ensures that required user fields meet format and length requirements.
 *
 * @constant
 * @type {Joi.ObjectSchema}
 */
export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * Validation schema for user login.
 * 
 * Ensures that login credentials are valid and properly formatted.
 *
 * @constant
 * @type {Joi.ObjectSchema}
 */
export const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * Continue your code below this line.
 * 
 * Add new Joi schemas as needed for different entities.
 * Example:
 * 
 * export const productSchema = Joi.object({
 *   name: Joi.string().min(3).required(),
 *   price: Joi.number().positive().required(),
 * });
 */
