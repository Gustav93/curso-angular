import { Component } from '@angular/core';
import {AuthService} from '../users/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  public navbarTitle = 'Angular app';

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    swal.fire('Logut ', `Hi ${this.authService.user.name}, you have successfully logged out`, 'success');
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
