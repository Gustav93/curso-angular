import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();

  private title = 'Crear cliente.';

  constructor(private clientService: ClientService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  public loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe((client) => this.client = client);
      }
    });
}

  public createClient(): void {
    this.clientService.create(this.client).subscribe(
       client => {this.router.navigate(['/clientes']);
                  swal.fire('Nuevo Cliente', `Cliente ${client.name} ${client.surname} creado exitosamente`, 'success');
      });
  }

  public update(): void {
    this.clientService.update(this.client).subscribe(client => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `Cliente ${client.name} ${client.surname} actualizado exitosamente`, 'success');
    });
  }
}
