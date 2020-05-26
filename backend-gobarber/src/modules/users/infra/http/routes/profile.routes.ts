import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.string(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.string()
        .when('password', {
          is: Joi.string(),
          then: Joi.required().valid(Joi.ref('password')),
        })
        .when('old_password', {
          is: Joi.string(),
          then: Joi.required().valid(Joi.ref('password')),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
