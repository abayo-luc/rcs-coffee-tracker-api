import { celebrate, Joi } from 'celebrate';

export const create = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      country: Joi.string().required(),
      region: Joi.string(),
      address: Joi.string(),
    })
    .options({
      abortEarly: false,
    }),
});
