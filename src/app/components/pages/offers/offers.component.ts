import {Component, OnInit} from '@angular/core';
import {Offre} from '../../../models/Offre';
import {OffreService} from '../../../services/offre.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbonnementClient } from 'src/app/models/AbonnementClient';
import { Client } from 'src/app/models/Client';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  loader = false;
  size: number;
  elementPerPage = 3;
  page = 1;

  offres: Offre[] = [];
  offre = new Offre();

  offrePayes: Offre[] = [];

  abonnement = new AbonnementClient();
  client = new Client();

  constructor(private service: OffreService, private modalService: NgbModal, private route: ActivatedRoute, private toast: ToastrService,
    private offreService: OffreService, private abonnementService: AbonnementService, private clientService: ClientService) {
  }


  ngOnInit(): void {
    this.getAll(this.page, this.elementPerPage);
    this.getOffrePaye();

    if(this.route.snapshot.params.etat != null) {
      if (this.route.snapshot.params.etat === 'success') {
        this.toast.success('Paiement effectué avec succes', 'Paiement Effectué');
        this.abonnerClient();
      } else {
        this.toast.error('Votre paiement a rencontré un problème', 'Echec de paiement');
      }
    }
  }

  getAll(page: number, taille: number) {
    this.service.getAll(page, taille).subscribe(
      (result) => {
        this.offres = result.content;
        this.size = result.totalElements;
      }
    );
  }

  annuler() {
    this.modalService.dismissAll();
  }

  open(content, item: Offre) {
    this.offre = item;
    this.modalService.open(content, {size: 'lg', centered:true, animation:true,});
  }

  abonnerClient() {

    let date:Date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    console.log('Date: ', date);
    console.log('Client: ', this.client);
    console.log('Offre: ', this.offre);

    let idClient = localStorage.getItem('client_id');
    let abonne: AbonnementClient = new AbonnementClient();
    let idOffre = localStorage.getItem('offre_id');

    abonne.client = new Client(parseInt(idClient));
    abonne.offre = new Offre(parseInt(idOffre));
    abonne.actif = true;
    abonne.duree = this.offre.duree;
    abonne.dateDebut = new Date();
    abonne.dateFin = date;

    this.abonnementService.create(abonne).subscribe(
      (result) => {
        this.toast.success('Abonnement effectué avec succes', 'Abonnement Effectué');
        this.getOneOffre(parseInt(idOffre));
      },
      (error) => {
        console.log('Error',error);
      }
    );
  }

  getClient(id: number) {
    this.clientService.find(id).subscribe(
      (result) => {
        console.log(result);
        this.client = result;
      }
    );
  }
  getOneOffre(id: number) {
    this.offreService.getOne(id).subscribe(
      (result) => {
        console.log(result);
        this.offre = result;
        this.offrePayes.push(result);
      }
    );
  }

  checkOffrePaye(offre: Offre): boolean {
    let index = this.offrePayes.indexOf(offre);
    if(index > -1) {
      return true;
    } else {
      return false;
    }
  }

  getOffrePaye() {
    this.abonnementService.getOffres().subscribe(
      (result) => {
        if(result != null) {
          this.offrePayes = result;
        }
      },
      (error) => {
        console.log('Error',error);
      }
    );
  }
}
