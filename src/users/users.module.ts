import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/entities/friend.entity';
import { FriendRequest } from 'src/entities/friendRequest.entity';
import { Picture } from 'src/entities/picture.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture, Post, User, Friend, FriendRequest]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
