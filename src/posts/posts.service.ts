import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from 'src/entities/picture.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddPostDto } from './dto/add-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getPosts() {
    return await this.postRepository.find();
  }

  async addPost(dto: AddPostDto, userId: number) {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const picture = this.pictureRepository.create({
      fileName: 'this is picture file name',
      width: dto.picture.width,
      height: dto.picture.height,
    });
    await this.pictureRepository.save(picture);

    const post = this.postRepository.create({
      title: dto.title,
      text: dto.text,
      user: user,
    });
    post.picture = picture;
    await this.postRepository.save(post);

    return HttpStatus.CREATED;
  }

  async deletePost(dto: DeletePostDto) {
    return await this.postRepository.delete(dto);
  }
}
