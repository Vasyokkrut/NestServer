import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AccountController } from './account.controller';

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
})
export class AccountModule {}
