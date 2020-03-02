import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import Swal from 'sweetalert2';
import {AuthService} from '../users/auth.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  public clients: Client[];

  constructor(private clientService: ClientService, private authService: AuthService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

  public delete(client: Client): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: `Seguro que quieres eliminar a ${client.name} ${client.surname}?`,
      text: 'El resultado no se podrá revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe(
          () => {
            this.clients = this.clients.filter(c => c !== client);
          });
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          `El cliente ${client.name} ${client.surname} fue eliminado con exito.`,
          'success'
        );
      }
    });
  }
}
