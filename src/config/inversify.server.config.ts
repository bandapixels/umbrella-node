import * as bodyParser from 'body-parser';
import express from 'express';

export const configFn = (app: express.Application): void => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
};
