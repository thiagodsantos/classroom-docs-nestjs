import Joi = require('@hapi/joi');

export const createDogSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),

  age: Joi.number()
    .integer()
});
