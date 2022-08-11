import * as Joi from 'joi';

export const UserValidation = Joi.object({
  email: Joi.string().email().required(),
  passwordHash: Joi.string().required(),
  name: Joi.string().required(),
  contactPhone: Joi.string(),
  role: Joi.string().valid('client', 'admin', 'manager'),
}).options({
  abortEarly: false,
});
