import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/entities/friend.entity';
import { FriendRequest } from 'src/entities/friendRequest.entity';
import { User } from 'src/entities/user.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend, FriendRequest])],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
