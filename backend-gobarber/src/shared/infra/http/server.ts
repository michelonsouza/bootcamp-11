import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());
app.use(globalExceptionHandler);

app.listen(3333, () =>
  // eslint-disable-next-line
  console.log('🚀 Server is running at http://localhost:3333'),
);
