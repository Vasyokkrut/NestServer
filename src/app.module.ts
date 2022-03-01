import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Picture } from './entities/picture.entity';
import { Music } from './entities/music.entity';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { MusicModule } from './music/music.module';
import { FriendsModule } from './friends/friends.module';
import { Friend } from './entities/friend.entity';
import { FriendRequest } from './entities/friendRequest.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'vasyok',
      password: 'colada',
      database: 'PrimaryDB',
      entities: [Music, Picture, Post, Friend, FriendRequest, User],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    AccountModule,
    MusicModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
