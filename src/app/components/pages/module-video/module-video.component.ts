import {Component, OnInit} from '@angular/core';
import {AbonnementClient} from '../../../models/AbonnementClient';
import {Offre} from '../../../models/Offre';
import {Module} from '../../../models/Module';
import {ClientService} from '../../../services/admin/client.service';
import {OffreService} from '../../../services/offre.service';
import {ModuleService} from '../../../services/module.service';

@Component({
  selector: 'app-module-video',
  templateUrl: './module-video.component.html',
  styleUrls: ['./module-video.component.scss']
})
export class ModuleVideoComponent implements OnInit {

  abonnement: AbonnementClient;
  offre: Offre;
  modules: Module[] = [];
  idClient: number;
  loader = false;
  page = 1;
  taille = 8;
  size: number;

  constructor(private clientService: ClientService, private moduleService: ModuleService) {
  }

  ngOnInit(): void {
    this.idClient = parseInt(localStorage.getItem('client_id'));
    if (this.idClient != null && this.idClient > 0) {
      this.getCurrentAbonnement(this.idClient);
    }
  }

  private getCurrentAbonnement(idClient: number) {
    this.loader = true;
    this.clientService.getCurrentAbonnement(idClient).subscribe(
      (result) => {
        this.abonnement = result;
        this.offre = result.offre;
        this.getModules(this.offre.id, this.page, this.taille);
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    );
  }

  getModules(idOffre: number, page: number, taille: number) {
    this.loader = true;
    this.moduleService.getPageableAllByOffre(idOffre, page, taille).subscribe(
      (result) => {
        this.modules = result.content;
        this.size = result.totalElements;
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    );
  }
}
