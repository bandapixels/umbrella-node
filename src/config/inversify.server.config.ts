import express from 'express';
import passport from 'passport';
import * as bodyParser from 'body-parser';

import { jwtStrategy } from './passport.config';

passport.use(jwtStrategy);

export const configFn = (app: express.Application): void => {
  app.use(passport.initialize());
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
};
