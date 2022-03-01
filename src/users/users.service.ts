import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from 'src/entities/picture.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['incomingFriendRequests', 'outgoingFriendRequests', 'friends'],
    });
  }

  getUser(username: string): Promise<User> {
    return this.userRepository.findOne(
      { name: username },
      { relations: ['posts'] },
    );
  }

  async addUser(dto: AddUserDto): Promise<number> {
    const picture = this.pictureRepository.create({
      fileName: 'this is picture file name',
      width: 1920,
      height: 1080,
    });
    await this.pictureRepository.save(picture);

    const post = this.postRepository.create({
      title: 'this is post title',
      text: 'this is post text',
    });
    post.picture = picture;
    await this.postRepository.save(post);

    const hash = await argon2.hash(dto.password, { type: argon2.argon2id });

    const user = this.userRepository.create({
      name: dto.name,
      passwordHash: hash,
    });
    user.posts = [post];
    user.music = [];
    user.friends = [];
    user.incomingFriendRequests = [];
    user.outgoingFriendRequests = [];
    await this.userRepository.save(user);

    return HttpStatus.CREATED;
  }

  async deleteUser(dto: DeleteUserDto) {
    return await this.userRepository.delete(dto);
  }
}
