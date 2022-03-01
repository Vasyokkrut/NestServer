import {
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
@Unique(['requester', 'recipient'])
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  requester: User;

  @ManyToOne(() => User)
  recipient: User;
}
