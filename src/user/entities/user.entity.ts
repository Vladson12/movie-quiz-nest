import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from './roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  login: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Column('varchar')
  role: Role;

  @Column('bigint')
  readonly createdAt: number;

  @Column('bigint')
  updatedAt: number;

  @Column('varchar', { nullable: true })
  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
