import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, OneToMany, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['user1', 'user2'])
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user1: User;

  @ManyToOne(() => User)
  user2: User;
}
