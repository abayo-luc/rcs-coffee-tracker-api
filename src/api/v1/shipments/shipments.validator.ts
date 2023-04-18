import { celebrate, Joi } from 'celebrate';

export const create = celebrate({
  body: Joi.object()
    .keys({
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      quantity: Joi.number().required(),
      status: Joi.string().allow(
        'PENDING',
        'IN_TRANSIT',
        'DELIVERED'
      ),
    })
    .options({
      abortEarly: false,
    }),
});
