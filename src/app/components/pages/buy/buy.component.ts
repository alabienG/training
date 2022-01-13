import {Component, Input, OnInit} from '@angular/core';
import {Offre} from '../../../models/Offre';
import {ActivatedRoute} from '@angular/router';
import {OffreService} from '../../../services/offre.service';
import {ModuleService} from '../../../services/module.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

class Card {
  numero: string;
  expriration: Date;
  ccv: string;
  noms: string;
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  offre = new Offre();
  choosePaiement = '';

  newCard = new Card();

  active = 0;
  active_type = 1;

  active_form = true;

  formCard: FormGroup;

  constructor(private router: ActivatedRoute, private offreService: OffreService, private moduleService: ModuleService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let id = this.router.snapshot.params.idOffre;
    this.getOneOffre(id);
  }

  getOneOffre(id: number) {
    this.offreService.getOne(id).subscribe(
      (result) => {
        console.log(result);
        this.offre = result;
      }
    );
  }

  choose($event) {
    this.choosePaiement = $event.target.value;
  }

  nexTabs() {
    if (this.active < 2) {
      this.active++;
    }
  }

  previousTabs() {
    this.active--;
  }

  changeType(type: number) {
    this.active_type = type;
    if (type == 1) {
      this.initFormCarte();
    }
  }

  initFormCarte() {
    this.formCard = this.formBuilder.group(
      {
        'numero': ['', Validators.required],
        'expiration': ['', Validators.required],
        'cvv': ['', Validators.required],
        'noms': ['', Validators.required],
      });
    this.active_form = this.formCard.invalid;
  }

  checkValide() {
    this.active_form = this.formCard.invalid;
    console.log(this.formCard.invalid);
  }

}
