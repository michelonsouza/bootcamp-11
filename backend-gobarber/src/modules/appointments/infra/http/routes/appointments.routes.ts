import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appontmentRouter = Router();
const appointmentsController = new AppointmentsController();

appontmentRouter.use(ensureAuthenticated);

appontmentRouter.post('/', appointmentsController.create);

export default appontmentRouter;
