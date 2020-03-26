import { Component, OnInit } from '@angular/core';
import {User} from './User';
import {AuthService} from './auth.service';
import {UserService} from './service/user.service';
import {Client} from "../clients/client";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  private users: User[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {console.log(users); this.users = users; });
  }

  public delete(user: User): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: `Are you sure to delete ${user.name} ${user.surname}?`,
      text: 'The result cannot be throw back',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user.id).subscribe(
          () => {
            this.users = this.users.filter(u => u !== user);
          });
        swalWithBootstrapButtons.fire(
          'Deleted!',
          `The user ${user.name} ${user.surname} sucessfully deleted.`,
          'success'
        );
      }
    });
  }
}
