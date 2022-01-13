import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../models/Client';
import {ClientService} from '../../../services/admin/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  succes = '';
  error = '';
  client: Client;
  registerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private service: ClientService) {
  }

  ngOnInit(): void {
    this.initform();
  }

  register() {
    let value = this.registerForm.value;
    this.client = new Client();
    this.client.nom = value.nom;
    this.client.prenom = value.prenom;
    this.client.email = value.email;
    this.client.telephone = value.telephone;
    console.log(this.client);
    this.service.register(this.client).subscribe(
      (result) => {

        this.succes = 'Votre compte a bien été créer !';
      }, error1 => {
        console.log(error1);
        this.error = error1.error.message;
      }
    );
  }

  initform() {
    this.registerForm = this.formBuilder.group({
      'nom': ['', Validators.required],
      'telephone': ['', Validators.required],
      'email': ['', Validators.required],
      'prenom': [''],
    });
  }

}
