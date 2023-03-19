import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  playedAt: Date;

  @Column()
  size: number;

  @Column()
  correctAnswers: number;

  @ManyToOne(() => User, null, { onDelete: 'SET NULL' })
  player: string;

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
