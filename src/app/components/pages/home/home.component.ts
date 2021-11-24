import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public username: string | null = '';
  public hasClientConnect = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('client_name');
    this.getCurrent();
  }

  private getCurrent() {
    let id = localStorage.getItem('client_id');
    if (id) {
      this.hasClientConnect = true;
    }
  }

  logout() {
    localStorage.removeItem('client_id');
    localStorage.removeItem('client_name');
    this.router.navigate(['/training/offers']);
  }
}
