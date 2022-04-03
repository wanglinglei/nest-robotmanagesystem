import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column()
  projectName: string;

  @Column()
  createUser: string;

  @Column()
  robotHook: string;

  @Column()
  secret: string;

  @Column()
  branch: string;
}

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

@Entity()
export class Joins {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  projectId: number;
  @Column()
  userNumber: string;
}
