import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Picture } from './picture.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToOne(() => Picture)
  @JoinColumn()
  picture: Picture;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
