import { Projects, Joins, Users } from './project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAddProject, IProject, IAddProjectJoinUser } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
    @InjectRepository(Joins)
    private readonly joinsRepository: Repository<Joins>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) { }
  // 查询已添加项目列表
  async findAll() {
    try {
      return await this.projectRepository.query('select * from projects');
    } catch (error) {
      return [];
    }
  }
  // 根据项目名称和分支查询是否已添加
  async checkAddByProBr(params: { projectName: string; branch: string }) {
    const { projectName, branch } = params;
    const result = await this.projectRepository.query(
      `select * from projects where projectName = '${projectName}' && branch = '${branch}'`,
    );
    // console.log('项目名称和分支', result);

    if (result?.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  //根据userNumber判断用户是否不存在
  async checkUserExist(params: { userNumber: string }) {
    const { userNumber } = params;
    try {
      const userList = await this.usersRepository.query(
        `select * from users where userNumber = '${userNumber}'`,
      );
      if (userList?.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // 根据项目id 查询已添加项目
  async findProjectById(params: { projectId: number }) {
    const { projectId } = params;
    const [project] = await this.projectRepository.query(
      `select * from projects where projectId = '${projectId}'`,
    );
    return project;
  }
  // 添加项目
  async addProject(params: IAddProject) {
    try {
      const res = await this.projectRepository.save(params);
      await this.joinsRepository.save({
        projectId: res.projectId,
        userNumber: '69995',
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  // 修改项目
  async updateProject(params: IProject) {
    const { projectId, projectName, branch, robotHook, secret } = params;
    try {
      const project = await this.findProjectById({ projectId });
      if (project) {
        const updateProject = {
          ...project,
          projectName,
          branch,
          robotHook,
          secret,
        };
        await this.projectRepository.save(updateProject);
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  // 删除项目
  async deleteProject(params: { projectId: number }) {
    try {
      const deleteProject = await this.findProjectById(params);
      await this.projectRepository.remove(deleteProject);
      return true;
    } catch (error) {
      return false;
    }
  }
  // 根据项目id查询项目参与人
  async findProjectJoinUserByProjectId(params: { projectId: number }) {
    try {
      // return this.joinsRepository
      //   .createQueryBuilder('joins')
      //   .leftJoinAndSelect('joins.list', 'users').where();
      return this.usersRepository.query(
        `select * from users LEFT JOIN joins ON joins.userNumber = users.userNumber and joins.projectId = '${params.projectId}'`,
      );
    } catch (error) { }
  }

  // 根据项目id及用户号查询项目参与人
  async findJoinUserByProjectIdAndUserNumber(params: IAddProjectJoinUser) {
    const { projectId, userNumber } = params;
    return await this.joinsRepository.query(
      `select * from joins where projectId = '${projectId}' and userNumber = '${userNumber}'`,
    );
  }

  // 添加项目参与人
  async addProjectJoinUser(params: IAddProjectJoinUser) {
    try {
      await this.joinsRepository.save(params);
      return true;
    } catch (error) {
      return false;
    }
  }

  // 删除项目参与人
  async deleteProjectJoinUser(params: IAddProjectJoinUser) {
    try {
      const result = await this.findJoinUserByProjectIdAndUserNumber(params);
      await this.joinsRepository.remove(result);
      return true;
    } catch (error) {
      return false;
    }
  }
}
