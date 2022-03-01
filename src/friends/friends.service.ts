import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from 'src/entities/friend.entity';
import { FriendRequest } from 'src/entities/friendRequest.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SendRequestDto } from './dto/send-request.dto';
import { DeleteFriendDto } from './dto/deleteFriend.dto';
import { AcceptFriendRequestDto } from './dto/acceptFriendRequest.dto';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestsRepository: Repository<FriendRequest>,
  ) {}

  async getFriends(user: RequestWithUser['user']): Promise<Friend[]> {
    return await this.friendsRepository
    .createQueryBuilder('friends')
    .leftJoinAndSelect('friends.user2', 'user2')
    .where('friends.user1 = :id', { id: user.userId })
    .getMany();
  }

  async getIncomingRequests(user: RequestWithUser['user']) {
    const requests = await this.friendRequestsRepository
      .createQueryBuilder('friend_requests')
      .leftJoinAndSelect('friend_requests.requester', 'requester')
      .where('friend_requests.recipient = :id', { id: user.userId })
      .getMany();

    return requests.map((request) => {
      return { name: request.requester.name, _id: request.requester.id };
    });
  }

  async getOutgoingRequests(user: RequestWithUser['user']) {
    const requests = await this.friendRequestsRepository
      .createQueryBuilder('friend_requests')
      .leftJoinAndSelect('friend_requests.recipient', 'recipient')
      .where('friend_requests.requester = :id', { id: user.userId })
      .getMany();

    return requests.map((request) => {
      return { name: request.recipient.name, _id: request.recipient.id };
    });
  }

  async sendRequest(user: RequestWithUser['user'], dto: SendRequestDto) {
    const requester = await this.usersRepository.findOne({
      name: user.username,
    });

    const recipient = await this.usersRepository.findOne({ name: dto.name });

    const request = this.friendRequestsRepository.create({
      requester,
      recipient,
    });

    try {
      await this.friendRequestsRepository.save(request);

      return HttpStatus.CREATED;
    } catch (error) {
      throw new HttpException('request already sent', HttpStatus.BAD_REQUEST);
    }
  }

  async acceptFriendRequest(
    userCredentials: RequestWithUser['user'],
    dto: AcceptFriendRequestDto,
  ) {
    const user = await this.usersRepository.findOne(userCredentials.userId);
    const acceptedUser = await this.usersRepository.findOne({ name: dto.name });

    const friends1 = this.friendsRepository.create({
      user1: user,
      user2: acceptedUser,
    });
    const friends2 = this.friendsRepository.create({
      user1: acceptedUser,
      user2: user,
    });

    await this.friendsRepository.save(friends1);
    await this.friendsRepository.save(friends2);

    return HttpStatus.OK;
  }

  async deleteFriend(userId: number, dto: DeleteFriendDto) {
    const user = await this.usersRepository.findOne(userId)
    const friend = await this.usersRepository.findOne(dto.friendId)
    await this.friendsRepository.delete({user1: user, user2: friend})
    await this.friendsRepository.delete({user1: friend, user2: user})
    return HttpStatus.OK
  }
}
