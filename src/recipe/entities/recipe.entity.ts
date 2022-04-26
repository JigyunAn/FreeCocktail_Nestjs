import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Like } from 'src/like/entities/like.entity';

@Entity('drink')
export class Recipe {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column('text', { array: true, nullable: true, default: '{}' })
  tags: string[];

  @Column({ type: 'simple-array', nullable: true })
  Ingredient: string[];

  @Column({ type: 'simple-array', nullable: true })
  measure: string[];

  @Column({ type: 'varchar', nullable: true })
  Instructions: string;

  @Column({ type: 'int', default: 0 }) // 좋아요 순으로 찾을때 사용
  likeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Like, (like) => like.drink)
  likes: Like[];
}
