import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(globalExceptionHandler);

app.listen(3333, () =>
  // eslint-disable-next-line
  console.log('🚀 Server is running at http://localhost:3333'),
);
