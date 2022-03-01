import { Request, Response } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import {JWTRefreshGuard} from 'src/auth/guards/jwt-refresh-auth.guard';
import { RefreshTokenPayload } from 'src/auth/tokenPayloads.interface';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request & {user: User},
  ) {
    const tokens = await this.authService.login(req.user);
    res.cookie('accessToken', `Bearer ${tokens.accessToken}`);
    res.cookie('refreshToken', `Bearer ${tokens.refreshToken}`);
    return HttpStatus.OK;
  }

  @UseGuards(JWTRefreshGuard)
  @Get('getNewAccessToken')
  async getNewAccessToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request & { user: RefreshTokenPayload },
  ) {
    const accessToken:string = await this.authService.getNewAccessToken(req.user);
    res.cookie('accessToken', `Bearer ${accessToken}`);
    return HttpStatus.OK;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return HttpStatus.OK;
  }
}
