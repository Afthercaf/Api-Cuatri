// src/schemas/auth.schema.js
import Joi from 'joi';

export const signupSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  telefono: Joi.string().min(6).required(),
  direccion: Joi.string().min(6).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
