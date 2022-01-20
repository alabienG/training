import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Module} from '../../../models/Module';
import { ModuleService } from 'src/app/services/module.service';
import {ClientService} from '../../../services/admin/client.service';
import { CourService } from '../../../services/cour.service';
import { Cours } from '../../../models/Cours';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-details-module',
  templateUrl: './details-module.component.html',
  styleUrls: ['./details-module.component.scss']
})
export class DetailsModuleComponent implements OnInit {

  loader = false;
  module = new Module();
  page = 1;
  taille = 8;
  size: number;
  modules: Module[] = [];
  cours: Cours[] = [];
  courses = new Map<Cours, any[]>();
  split: any[] = [];

  constructor(private moduleService: ModuleService, private route: ActivatedRoute, private clientService: ClientService,
    private coursService: CourService, private uploadService: UploadService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id != null) {
      this.getModule(this.route.snapshot.params.id);
      this.getCurrentAbonnement();
    }
  }

  getModule(id: number) {
    this.moduleService.getOne(id).subscribe((result) => {
      if (result != null) {
        this.module = result;
        console.log('Module', result);
        this.getCourses(result.id);
        this.loader = false;
      }
    },
    (error) => {
      console.log('Error', error);
      this.loader = false;
    });
  }

  private getCurrentAbonnement() {
    let idClient = parseInt(localStorage.getItem('client_id'));
    this.loader = true;
    this.clientService.getCurrentAbonnement(idClient).subscribe(
      (result) => {
        this.getModules(result.offre.id, this.page, this.taille);
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
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    );
  }

  getCourses(idModule: number) {
    this.coursService.allByModule(idModule, this.page, this.taille).subscribe(
      (result) => {
        this.cours = result.content;
        this.size = result.totalElements;
        console.log('Cours', this.cours);
        this.getVideos(this.cours);
        this.loader = false;
      }, error => {
        this.loader = false;
      }
    );
  }

  getVideos(cours: Cours[]) {
    cours.forEach((value) => {
      let split = value.path.split(';');
      let videos: any[] = [];

      split.forEach((video) => {
        if (video != null && video != '') {
          // this.uploadService.download(video).subscribe(
          //   (result) => {
          //     videos.push(result);
          //   }, error => {
          //     this.loader = false;
          //   }
          // );
          this.split.push(video);
        }
      });

      this.courses.set(value, videos);
    });
  }

}
