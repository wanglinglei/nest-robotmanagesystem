import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { IAddUserParams } from './user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }
  async findAll(): Promise<Users[]> {
    return await this.userRepository.query('select * from users');
  }
  async findOne(): Promise<Users[]> {
    return await this.userRepository.query(
      'select * from users where uid = 123456 or userNumber = 69992',
    );
  }
  // 根据工号 手机号判断是否注册过
  async checkIsRegister({ userNumber, phoneNumber }): Promise<boolean> {
    const resultList = await this.userRepository.query(
      `select * from users where phoneNumber = ${phoneNumber} or userNumber = ${userNumber}`,
    );
    if (resultList.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  // 新增用户
  async addUser(addUserParams: IAddUserParams) {
    try {
      const res = await this.userRepository.save(addUserParams);

      return true;
    } catch (error) {
      return false;
    }
  }
}
