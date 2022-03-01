import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from 'src/entities/picture.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture, Post, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
