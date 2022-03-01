import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTConstants } from 'src/auth/constants';
import { AccessTokenPayload } from '../tokenPayloads.interface';

const extractJWTFromCookieAsBearerToken = (req: Request) => {
  const authCookie = req.cookies['accessToken'];
  const token = authCookie && authCookie.split(' ')[1];

  return token || null;
};

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractJWTFromCookieAsBearerToken,
      ignoreExpiration: false,
      secretOrKey: JWTConstants.ACCESSSECRETKEY,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
