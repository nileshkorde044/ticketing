import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@naktickets/common';
import { createTicketRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // so express know app is behind ingress and can trust this https traffic
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // set cookie and use only when app is used over https
  })
);

app.use(currentUser);

app.use(createTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
