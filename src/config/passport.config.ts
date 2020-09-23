import passportJWT from 'passport-jwt';
import passport from 'passport';
import { Unauthorized } from 'http-errors';
import { envConfig } from './env.config';

const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const JwtSecretKey = envConfig.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSecretKey,
};

export const jwtStrategy = new JwtStrategy(
  opts,
  (payload, next) => (payload.type === 'REFRESH' ? next(new Unauthorized('BAD_JWT_TOKEN'), null) : next(null, payload)),
);

export const passportAuthMiddleware = passport.authenticate(
  'jwt',
  {
    session: false,
  },
);
