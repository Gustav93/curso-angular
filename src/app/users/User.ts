import {Role} from './Role';

export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  enabled: boolean;
  authorities: string[] = [];
  roles: Role[] = [];

}
