import Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  API_PREFIX: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_POST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  AUTH_JWT_SECRET: Joi.string().required(),
  AUTH_JWT_TOKEN_EXPIRES_IN: Joi.string().required(),
  AUTH_REFRESH_SECRET: Joi.string().required(),
  AUTH_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  MAIL_SERVICE: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_DEFAULT_EMAIL: Joi.string().required(),
  MAIL_DEFAULT_NAME: Joi.string().required(),
  FILE_DRIVER: Joi.string().required(),
});
