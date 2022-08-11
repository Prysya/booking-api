import * as Joi from 'joi';

export const createHotelSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.string().required(),
  favorite: Joi.string()
    .optional()
    .default('https://source.unsplash.com/random/'),
  fileName: Joi.string().required(),
});

/*
*   @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  favorite: string;

  @Prop({ default: 'https://source.unsplash.com/random/' })
  fileCover: string;

  @Prop({ required: true })
  fileName: string;
* */
