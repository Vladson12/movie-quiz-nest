import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  login: string;
  @Exclude()
  @Column('varchar')
  password: string;
  @Column('bigint')
  readonly createdAt: number;
  @Column('bigint')
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
