import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
import { UserService } from './userServices';
import { Users } from './user.entity';
import { IUserRegister } from './user.dto';
import { creatToken, parsingToken } from '../../utils/jwt';
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/list')
  findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }
  @Post('/login')
  userLogin() {
    return this.userService.findOne();
  }
  @Post('/register')
  async userRegister(@Query() userQuery: IUserRegister) {
    // const tokenres = parsingToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTnVtYmVyIjoiNjk5OTMiLCJpYXQiOjE2NDM1NTAzNzN9.ceMUSVLj5WJcmitI_gAIY53udg2hgYAeI8uCUgpzhM4',
    // );
    const { userNumber, phoneNumber, userName, passWord } = userQuery;
    //判断时候注册过 注册过返回异常 未注册过新增用户
    const isRegistered = await this.userService.checkIsRegister({
      userNumber,
      phoneNumber,
    });

    if (isRegistered) {
      return {
        status: '8000',
        subMsg: '该工号或手机号已被注册',
      };
    } else {
      const token = creatToken({ userNumber });
      const addRes = this.userService.addUser({
        userNumber,
        userName,
        phoneNumber,
        passWord,
        token,
      });
      if (addRes) {
        return {
          status: '9999',
          subMsg: '注册成功',
          token,
        };
      } else {
        return {
          status: '1000',
          subMsg: '系统异常',
        };
      }
    }
  }
}
