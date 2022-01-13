import {Component, OnInit, ViewChild} from '@angular/core';
import {OffreService} from '../../../services/offre.service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Offre} from '../../../models/Offre';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  offres: Offre[];
  loader = false;
  loader_action = false;
  size = 0;
  offreForm: FormGroup;
  offre = new Offre();

  page= 1;
  elementPerPage = 10;

  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective;

  constructor(private service: OffreService, private toast: ToastrService, private formBuilder: FormBuilder,
              private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.toast.overlayContainer = this.toastContainer;
    this.getAll(this.page, this.elementPerPage);
    this.initForm();
  }

  getAll(page:number, taille:number) {
    this.loader = true;
    this.service.getAll(page, taille).subscribe(
      (resul) => {
        console.log(resul);
        this.size = resul.totalElements;
        this.offres = resul.content;
        this.loader = false;
      },
      (error => {
        this.loader = false;
        this.size = 0;
      })
    );
  }

  initForm() {
    this.offreForm = this.formBuilder.group({
      'libelle': ['', Validators.required],
      'montant': ['', Validators.required],
      'duree': ['', Validators.required],
      'description': ['']
    });
  }


  addOrUpdateOffre() {
    this.loader_action = true;
    let formValue = this.offreForm.value;

    this.offre.libelle = formValue.libelle;
    this.offre.montant = formValue.montant;
    this.offre.duree = formValue.duree;
    this.offre.description = formValue.description;

    if (this.offre.id > 0) {
      // on est en update
      let index = this.offres.indexOf(this.offre);
      this.service.update(this.offre).subscribe(
        (result) => {
          if (index > -1) {
            this.offres.splice(index, 1);
            this.offres.push(result);
            this.toast.success('Enregistrement éffectué avec succès !', 'Succès');
            this.loader_action = false;
            this.annuler();
          }
        }, (error => {
          this.toast.error(error.error.message, 'Echec');
          this.loader_action = false;
          this.modalService.dismissAll();
          console.log(error);
        })
      );
    } else {
      // on est en insertion
      this.service.create(this.offre).subscribe(
        (result) => {
          this.offres.push(result);
          this.size++;
          this.toast.success('Enregistrement éffectué avec succès !', 'Succès');
          this.loader_action = false;
          this.annuler();
        }, (error => {
          this.toast.error(error.error.message, 'Echec');
          this.loader_action = false;
          this.modalService.dismissAll();
          console.log(error);
        })
      );
    }
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openToUpdate(content, bean: Offre) {
    this.offre = bean;
    this.open(content);
  }

  openToDelete(content, bean: Offre) {
    this.offre = bean;
    this.modalService.open(content);
  }

  annuler() {
    this.offre = new Offre();
    this.modalService.dismissAll();
  }

  supprimer() {
    this.loader_action = true;
    if (this.offre != null ? this.offre.id > 0 : false) {
      let index = this.offres.indexOf(this.offre);
      this.service.delete(this.offre.id).subscribe(
        (result) => {
          if (index > -1) {
            this.offres.splice(index, 1);
            this.toast.success(result.message);
            this.loader_action = false;
            this.size--;
            this.annuler();
          }
        },
        error => {
          this.toast.error(error.error.message);
          console.log(error);
          this.annuler();
        }
      );
    } else {
      this.toast.warning('Veuillez choisir une offre à supprimer !', 'Warning');
    }
  }

}
