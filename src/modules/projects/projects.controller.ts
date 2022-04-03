import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
import { Projects } from './project.entity';
import { ProjectService } from './projectServices';
import { IAddProject, IProject, IAddProjectJoinUser } from './project.dto';
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}
  // 查询项目列表
  @Get('/projectList')
  async findAll() {
    const projectList = await this.projectService.findAll();
    return {
      status: '9999',
      data: projectList,
    };
  }
  // 根据项目id 查询项目参与人
  @Post('/projectJoinUser')
  async findOneByProjectId(@Query() projectQuery: { projectId: number }) {
    const joinUserList =
      await this.projectService.findProjectJoinUserByProjectId(projectQuery);
    return {
      status: '9999',
      data: joinUserList,
    };
  }
  // 新增项目
  @Post('/addProject')
  async addProject(@Query() projectQuery: IAddProject) {
    const { projectName, robotHook, secret, branch } = projectQuery;
    const hasAddFlag = await this.projectService.checkAddByProBr({
      projectName,
      branch,
    });
    if (hasAddFlag) {
      return {
        status: '8000',
        subMsg: '该项目分支已添加',
      };
    }
    const createUser = '69995';

    const params = {
      projectName,
      robotHook,
      secret,
      branch,
      createUser,
    };

    const addResult = await this.projectService.addProject(params);
    if (addResult) {
      return {
        status: '9999',
        subMsg: '新增成功',
      };
    } else {
      return {
        status: '1000',
        subMsg: '系统异常',
      };
    }
  }
  // 修改项目
  @Post('/updateProject')
  async updateProject(@Query() projectQuery: IProject) {
    const updateFlag = await this.projectService.updateProject(projectQuery);
    if (updateFlag) {
      return {
        status: '9999',
        subMsg: '修改成功',
      };
    } else {
      return {
        status: '1000',
        subMsg: '系统异常',
      };
    }
  }
  // 删除项目
  @Post('/deleteProject')
  async deleteProject(@Query() projectQuery: { projectId: number }) {
    const deleteFlag = await this.projectService.deleteProject(projectQuery);
    if (deleteFlag) {
      return {
        status: '9999',
        subMsg: '删除成功',
      };
    } else {
      return {
        status: '1000',
        subMsg: '系统异常',
      };
    }
  }

  // 添加项目参与人
  @Post('/addProjectJoinUser')
  async addProjectJoinUser(@Query() projectQuery: IAddProjectJoinUser) {
    const userExist = await this.projectService.checkUserExist(projectQuery);
    if (userExist) {
      const joinUser =
        await this.projectService.findJoinUserByProjectIdAndUserNumber(
          projectQuery,
        );
      if (joinUser?.length > 0) {
        return {
          status: '1000',
          subMsg: '该用户已是该项目参与者',
        };
      } else {
        const addFlag = await this.projectService.addProjectJoinUser(
          projectQuery,
        );
        if (addFlag) {
          return {
            status: '9999',
            subMsg: '添加成功',
          };
        } else {
          return {
            status: '1000',
            subMsg: '添加失败',
          };
        }
      }
    } else {
      return {
        status: '1000',
        subMsg: '用户不存在',
      };
    }
  }

  // 删除项目参与人
  @Post('/deleteProjectJoinUser')
  async deleteProjectJoinUser(@Query() projectQuery: IAddProjectJoinUser) {
    const addFlag = await this.projectService.deleteProjectJoinUser(
      projectQuery,
    );
    if (addFlag) {
      return {
        status: '9999',
        subMsg: '删除成功',
      };
    } else {
      return {
        status: '1000',
        subMsg: '删除失败',
      };
    }
  }
}
