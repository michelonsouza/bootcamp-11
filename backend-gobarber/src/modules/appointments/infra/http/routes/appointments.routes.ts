import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appontmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appontmentsRouter.use(ensureAuthenticated);

appontmentsRouter.post('/', appointmentsController.create);

export default appontmentsRouter;
