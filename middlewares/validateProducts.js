import Joi from "joi";
import { createError } from "../helpers/createError.js";

const discountValidationSchema = Joi.object({
  discount: Joi.number().integer().max(100).min(0).required(),
});

export const validateDiscount = (req, res, next) => {
  try {
    const { error } = discountValidationSchema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    next();
  } catch (error) {
    next(error);
  }
};
