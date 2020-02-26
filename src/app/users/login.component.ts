import { Component, OnInit } from '@angular/core';
import { User } from './User';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

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
  }

  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      swal.fire('Sign In error', 'Username or password is empty', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      const payload = JSON.parse(atob(response.access_token.split('.')[1]));
      console.log(payload);
      swal.fire('Sign In Success', `Hi ${payload.name}, you have been successfully logged into the app`, 'success');
      this.router.navigate(['/clientes']);
    });
  }
}
