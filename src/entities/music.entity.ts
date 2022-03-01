import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  fileName: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
