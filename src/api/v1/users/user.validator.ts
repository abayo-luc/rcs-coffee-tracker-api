import { celebrate, Joi } from 'celebrate';

export const create = celebrate({
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string()
        .min(6)
        .message('invalid password')
        .required(),
      email: Joi.string().email(),
      role: Joi.string().allow('USER', 'ADMIN'),
    })
    .options({
      abortEarly: false,
    }),
});

export const login = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});
