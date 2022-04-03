import { Module } from '@nestjs/common';
import { controllerModule, serviceModule } from './modules/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './modules/users/userModule';
import { ProjectModule } from './modules/projects/projectModule';
import { UserController } from './modules/users/users.controller';
import { UserService } from './modules/users/userServices';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      logging: true,
      username: 'root',
      password: '123456',
      database: 'robot',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ProjectModule,
  ],
  // controllers: [UserController],
  // providers: [UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
