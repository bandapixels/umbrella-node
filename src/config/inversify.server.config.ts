import express from 'express';
import cors from 'cors';
import passport from 'passport';
import * as bodyParser from 'body-parser';

import { jwtStrategy } from './passport.config';

passport.use(jwtStrategy);

export const configFn = (app: express.Application): void => {
  app.set('view engine', 'pug');

  app.use(cors());

  app.use(passport.initialize());

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());
};
