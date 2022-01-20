import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public username: string | null = '';
  public hasClientConnect = false;
    public hasAbonnement = false;

  constructor(private router: Router, private abonnementService: AbonnementService, private application: ApplicationService) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('client_name');
    // alert('route : ' + this.application.getHost());
    this.getCurrent();
  }

  private getCurrent() {
    let id = localStorage.getItem('client_id');
    if (id) {
      this.hasClientConnect = true;
      this.checkAbonnement(parseInt(id));
    }
  }

  logout() {
    localStorage.removeItem('client_id');
    localStorage.removeItem('client_name');
    this.router.navigate(['/training/offers']);
  }

  checkAbonnement(id:number) {
    this.abonnementService.oneByClient(id).subscribe(
      (value) => {
        if (value != null && value.id > 0) {
          //alert('ookk');
          this.hasAbonnement = true;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
