import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/entities/music.entity';
import { MusicController } from './music.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Music, User])],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
