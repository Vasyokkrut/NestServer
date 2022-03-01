import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @OneToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;
}
