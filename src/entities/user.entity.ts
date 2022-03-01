import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Friend } from './friend.entity';
import { FriendRequest } from './friendRequest.entity';
import { Music } from './music.entity';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  posts: Post[];

  @OneToMany(() => Music, (music) => music.user)
  @JoinColumn()
  music: Music[];

  @OneToMany(() => Friend, friend => friend.user1)
  @JoinColumn()
  friends: Friend[];

  @OneToMany(() => FriendRequest, (request) => request.recipient)
  @JoinColumn()
  incomingFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (request) => request.requester)
  @JoinColumn()
  outgoingFriendRequests: FriendRequest[];
}
