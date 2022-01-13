import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../services/admin/client.service';
import {Client} from '../../../models/Client';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})

export class ClientComponent implements OnInit {
  page = 0;
  pageSize = 4;
  clients: Client[];
  loader = false;
  size = 0;

  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective;

  constructor(private service: ClientService, private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    this.getClient(this.page, this.pageSize);
  }

  getClient(page: number, taille: number) {
    this.loader = true;
    this.service.getAll(page, taille).subscribe(
      (result) => {
        this.loader = false;
        this.clients = result;
        this.size = result.length;
      },
      (error) => {
        this.loader = false;
      }
    );
  }



}
