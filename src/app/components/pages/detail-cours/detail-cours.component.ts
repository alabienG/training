import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClientService} from '../../../services/admin/client.service';
import { CourService } from '../../../services/cour.service';
import { Cours } from '../../../models/Cours';
import { UploadService } from '../../../services/upload.service';
import { Resource } from '../../../models/resource';

@Component({
  selector: 'app-detail-cours',
  templateUrl: './detail-cours.component.html',
  styleUrls: ['./detail-cours.component.scss']
})
export class DetailCoursComponent implements OnInit {

  loader = false;
  cour = new Cours();
  page = 1;
  taille = 8;
  size: number;
  cours: Cours[] = [];
  videos: any[] = [];
  resources: Resource[] = [];
  split: any[] = [];

  constructor(private route: ActivatedRoute, private clientService: ClientService,
    private coursService: CourService, private uploadService: UploadService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id != null) {
      this.getCours(this.route.snapshot.params.id);
    }
  }

  getCours(id: number) {
    this.coursService.getOne(id).subscribe((result) => {
      if (result != null) {
        this.cour = result;
        console.log('Cours', result);
        this.loader = false;
      }
    },
    (error) => {
      console.log('Error', error);
      this.loader = false;
    });
  }

  getVideos(cours: Cours) {
    let split = cours.path.split(';');
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
  }

  getResource(idCours: number) {
    
  }
}
