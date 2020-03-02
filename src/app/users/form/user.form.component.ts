import { Component, OnInit } from '@angular/core';
import {User} from '../User';

@Component({
  selector: 'app-form',
  templateUrl: './user.form.component.html'
})

export class UserFormComponent implements OnInit {

  title = 'Create User';

  private user: User = new User();

  constructor() { }

  ngOnInit() {
  }

}
