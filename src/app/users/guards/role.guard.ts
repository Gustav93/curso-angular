/* tslint:disable:no-string-literal */
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements  CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);

      return false;
    }
    const role = route.data['role'] as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal.fire('Unauthorized', `Hi ${this.authService.user.name}, you don't have permissons to use this content`, 'warning');
    this.router.navigate(['/clientes']);
    return false;
  }
}
