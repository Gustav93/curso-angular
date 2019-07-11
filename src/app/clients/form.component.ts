import { Component, OnInit } from '@angular/core';
import {Client} from './client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();

  private title = 'Crear cliente.';

  constructor() { }

  ngOnInit() {
  }

  public createClient(): void {
    console.log('clicked!');
    console.log(this.client);
  }
}
