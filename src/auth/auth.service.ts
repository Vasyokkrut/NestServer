import ms from 'ms';
import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { JWTConstants } from './constants';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './tokenPayloads.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUser(username);
    if (user && argon2.verify(user.passwordHash, password)) return user

    return null;
  }

  async login(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenPayload: AccessTokenPayload = {
      username: user.name,
      sub: user.id,
    };
    const refreshTokenPayload: RefreshTokenPayload = {
      username: user.name,
      sub: user.id,
      passwordHash: user.passwordHash,
    };

    const accessJwtSignOptions: JwtSignOptions = {
      secret: JWTConstants.ACCESSSECRETKEY,
      algorithm: 'HS256',
      expiresIn: ms(JWTConstants.ACCESSTOKENLIFETIME),
    };
    const refreshJwtSignOptions: JwtSignOptions = {
      secret: JWTConstants.REFRESHSECRETKEY,
      algorithm: 'HS512',
      expiresIn: ms(JWTConstants.REFRESHTOKENLIFETIME),
    };

    const accessToken = await this.JWTService.signAsync(
      accessTokenPayload,
      accessJwtSignOptions,
    );
    const refreshToken = await this.JWTService.signAsync(
      refreshTokenPayload,
      refreshJwtSignOptions,
    );

    return { accessToken, refreshToken };
  }

  async getNewAccessToken(user: RefreshTokenPayload): Promise<string> {
    const accessTokenPayload: AccessTokenPayload = {
      username: user.username,
      sub: user.sub,
    };

    const accessJwtSignOptions: JwtSignOptions = {
      secret: JWTConstants.ACCESSSECRETKEY,
      algorithm: 'HS256',
      expiresIn: ms(JWTConstants.ACCESSTOKENLIFETIME),
    };

    const accessToken = await this.JWTService.signAsync(
      accessTokenPayload,
      accessJwtSignOptions,
    );

    return accessToken
  }
}
