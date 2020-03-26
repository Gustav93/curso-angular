import {Role} from '../users/Role';

export class Client {
  public id: number;
  public username: string;
  public password: string;
  public name: string;
  public surname: string;
  public email: string;
  public enabled: boolean;
  authorities: string[] = [];
  roles: Role[] = [];
}
