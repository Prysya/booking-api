import * as Joi from 'joi';

export const CreateHotelValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
}).options({
  abortEarly: false,
});
