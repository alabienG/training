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

  newCard = new Card();

  pay : boolean;

  constructor(private route: ActivatedRoute, private offreService: OffreService, private moduleService: ModuleService,
              private formBuilder: FormBuilder, private router: Router,
              private cardService: CardService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.idOffre;
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

  async buy(): Promise<void> {
    localStorage.setItem('offre_id', this.offre.id + '');
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
