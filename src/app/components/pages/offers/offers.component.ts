import {Component, OnInit} from '@angular/core';
import {Offre} from '../../../models/Offre';
import {OffreService} from '../../../services/offre.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private service: OffreService, private modalService: NgbModal) {
  }


  ngOnInit(): void {

    this.getAll(this.page, this.elementPerPage);
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
}
