import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userNumber: string;
  @Column()
  userName: string;

  @Column()
  passWord: string;

  @Column()
  phoneNumber: string;

  @Column()
  token: string;
}
