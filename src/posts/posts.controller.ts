import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddPostDto } from './dto/add-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('getPosts')
  getPosts() {
    return this.postsService.getPosts();
  }

  @UseGuards(JWTAuthGuard)
  @Post('addPost')
  addPost(@Body() dto: AddPostDto, @Req() req) {
    return this.postsService.addPost(dto, req.user.id);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('deletePost')
  deletePost(@Body() dto: DeletePostDto) {
    return this.postsService.deletePost(dto);
  }

  @Get('getPostPicture')
  @Header('Content-Type', 'image/*')
  getPostPicture() {
    const file = createReadStream('F:\\1.jpg');
    return new StreamableFile(file);
  }
}
