export interface IAddProject {
  projectName: string;
  robotHook: string;
  branch: string;
  secret: string;
}
export interface IProject {
  projectId: number;
  projectName: string;
  robotHook: string;
  branch: string;
  secret: string;
  createUser: string;
}

export interface IAddProjectJoinUser {
  projectId: number;
  userNumber: string;
}
