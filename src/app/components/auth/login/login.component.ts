import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error = '';
  public succes = '';
  public email = '';
  public client;
  loader = false;
  authForm = this.formBuilder.group({
    'email': ['', Validators.email],
  });

  codeAuth = this.formBuilder.group({
    'code': ['', Validators.required]
  });


  constructor(private formBuilder: FormBuilder, private service: LoginService, private router: Router) {
  }


  ngOnInit(): void {
    this.error = '';
  }

  login() {
    this.loader = true;
    this.service.generatedCode(this.authForm.value.email).subscribe(
      (result) => {
        this.loader = false;
        this.client = result;
        this.succes = 'Ravis de vous revoir M/Mme/Mlle ' + result.nom + ' ' + result.prenom + ', Nous vous avons envoyer votre code d\'identification par mail';
        console.log(result);
      },
      (error) => {
        this.loader = false;
        this.error = error.error;
        console.log(error);
      }
    );
  }

  terminer() {
    if (this.client.code === this.codeAuth.value.code) {
      localStorage.setItem('client_id', this.client.id);
      localStorage.setItem('client_name', this.client.nom);
      this.router.navigate(['/training/modules']);
    } else {
      this.error = 'Le code ne correspond pas, veuillez reessayer !';
    }
  }

}
