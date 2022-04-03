import { UserController } from './users/users.controller';
import { ProjectsController } from './projects/projects.controller';

import { ProjectService } from './projects/projectServices';
import { UserService } from './users/userServices';
export const controllerModule = [UserController, ProjectsController];

export const serviceModule = [ProjectService, UserService];
