import { Component, OnInit } from '@angular/core';
import {User} from './User';
import {AuthService} from './auth.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  private users: User[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users);
  }

}
