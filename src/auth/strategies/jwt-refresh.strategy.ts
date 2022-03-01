import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTConstants } from '../constants';
import { RefreshTokenPayload } from '../tokenPayloads.interface';

@Injectable()
export class RefreshJWTStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.refreshToken?.split(' ')[1],
      ]),
      secretOrKey: JWTConstants.REFRESHSECRETKEY,
    });
  }

  async validate(payload: RefreshTokenPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      passwordHash: payload.passwordHash,
    };
  }
}
