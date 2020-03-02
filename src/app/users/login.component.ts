import { Component, OnInit } from '@angular/core';
import { User } from './User';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title = 'Please, Sign In';
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal.fire('Sign In', `Hi ${this.authService.user.name}, you're already authenticated`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      swal.fire('Sign In error', 'Username or password is empty', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync('12345', salt);
      console.log(pass);

      this.authService.saveToken(response.access_token);
      this.authService.saveUser(response.access_token);

      const user = this.authService.user;

      swal.fire('Sign In Success', `Hi ${user.name}, you have been successfully logged into the app`, 'success');
      this.router.navigate(['/clientes']);
    }, error => {
      // tslint:disable-next-line:triple-equals
      if (error.status == 400) {
        swal.fire('Sign In error', 'Wrong Username or password', 'error');
        }
      }
    );
  }
}
