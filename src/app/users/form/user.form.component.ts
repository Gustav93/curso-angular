import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-form',
  templateUrl: './user.form.component.html'
})

export class UserFormComponent implements OnInit {

  title = 'Create User';

  private user: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.userService.getClient(id).subscribe(user => {console.log(user); this.user = user;});
      }
    });
  }

  private createUser(): void {
    this.user.roles = [{id: 2 , name: 'ROLE_USER'}];
    this.user.enabled = true;
    this.user.password = bcrypt.hashSync(this.user.password, bcrypt.genSaltSync(10));
    this.userService.create(this.user).subscribe(user => {
      this.router.navigate(['/users']);
      swal.fire('Nuevo User', `User ${this.user.name} ${this.user.surname} successfully created`, 'success');
    });
  }

  private updateUser(): void {
    this.userService.getClient(this.user.id).subscribe(userSource => {
      if (userSource.password !== this.user.password) {
        this.user.password = bcrypt.hashSync(this.user.password, bcrypt.genSaltSync(10));
      }
      this.userService.update(this.user).subscribe(user => {
        this.router.navigate(['/users']);
        swal.fire('User Updated', `User ${user.name} ${user.surname} successfully updated`, 'success');
      });
    });
  }
}
