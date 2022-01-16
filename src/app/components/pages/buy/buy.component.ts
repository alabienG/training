import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import {Offre} from '../../../models/Offre';
import {ActivatedRoute, Router} from '@angular/router';
import {OffreService} from '../../../services/offre.service';
import {ModuleService} from '../../../services/module.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StripeService } from 'src/app/services/stripe.service';
import { CardService } from 'src/app/services/card.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

class Card {
  numero: string;
  expiration: Date;
  ccv: string;
  noms: string;
}

declare var stripe: any;
declare var elements: any;
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  // We load  Stripe
  stripePromise = loadStripe(environment.stripePublicKey);
  
  offre = new Offre();
  choosePaiement = '';

  newCard = new Card();

  active = 0;
  active_type = 1;

  active_form = true;

  formCard: FormGroup;

  pay : boolean;

  constructor(private route: ActivatedRoute, private offreService: OffreService, private moduleService: ModuleService,
              private formBuilder: FormBuilder, private router: Router,
              private cardService: CardService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.idOffre;
    this.getOneOffre(id);
    this.pay = false;
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
    this.checkBeforeBuy();
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

  chargeCreditCard(form) {
    this.newCard = new Card();
    this.newCard.ccv = form.cvv.value;
    this.newCard.expiration = form.expiration.value;
    this.newCard.noms = form.noms.value;
    this.newCard.numero = form.numero.value;

    if (this.newCard.ccv != '' && this.newCard.expiration !== null && this.newCard.noms != '' && this.newCard.numero != '') {
      this.pay = true;
    } else {
      this.pay = false;
    }
    //alert('card : ' + JSON.stringify(this.newCard));
  }

  checkBeforeBuy() {
    if (this.active == 1) {
      if (this.active_type == 1) {
        // let form = document.getElementsByTagName("form")[0];
        // console.log('form : ', form);
        // console.log('value : ', form.expiration.value);
        this.buy();
      } else {
        this.active++;
      }
    } else {
      this.active++;
    }
  }

  async buy(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: '' + this.offre.libelle,
      currency: 'xaf',
      amount: this.offre.montant,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/#/offers/cancel',
      successUrl: 'http://localhost:4200/#/offers/success',
    };

    // this is a normal http calls for a backend api
    this.checkout(payment);
  }

  async checkout(payment) {
    const stripe = await this.stripePromise;
    this.cardService.checkout(payment).subscribe(
      (data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      }
    );
  }
}
