import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { loginType } from '../LoginType';
import * as bcrypt from 'bcrypt';
import { Like } from 'src/like/entities/like.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'enum', enum: loginType, default: loginType.none })
  type: loginType;

  @BeforeInsert()
  async hashPassword() {
    console.log('체크');
    this.password = await bcrypt.hash(this.password, 10);
  }
  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];
}
