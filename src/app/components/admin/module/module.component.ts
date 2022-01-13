import {Component, OnInit, ViewChild} from '@angular/core';
import {Module} from '../../../models/Module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModuleService} from '../../../services/module.service';
import {OffreService} from '../../../services/offre.service';
import {Offre} from '../../../models/Offre';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  loader = false;
  loader_action = false;
  totalLenth: number;
  size = 0;
  page = 1;
  totalElementperPage = 10;

  modules: Module[] = [];
  moduleForm: FormGroup;
  module = new Module();
  offres: Offre[] = [];
  offreSelected = new Offre();


  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective;

  constructor(private toasts: ToastrService, private formBuilder: FormBuilder, private modalService: NgbModal,
              private service: ModuleService, private offreService: OffreService) {
  }

  ngOnInit(): void {
    this.toasts.overlayContainer = this.toastContainer;
    this.getAll(this.page, this.totalElementperPage);
    this.initForm();
    this.getAllOffre();
  }

  getAll(page:number, taille:number) {
    this.loader = true;
    this.service.getAll(page , taille).subscribe(
      (result) => {
        if(result != null){
          this.size = result.totalElements;
          this.totalLenth =result.totalElements;
          this.modules = result.content;
        }

        this.loader = false;
      },
      (error => {
        this.loader = false;
        this.size = 0;
      })
    );
  }

  getAllOffre() {
    this.loader_action = true;
    this.offreService.getAll(1, 10).subscribe(
      (results) => {
        this.loader_action = false;
        this.offres = results.content;
      },
      error => {
        console.log(error);
        this.loader_action = false;
      }
    );
  }

  initForm() {
    this.moduleForm = this.formBuilder.group({
      'libelle': ['', Validators.required],
      'prerequis': [''],
      'nombreVideo': ['', Validators.required],
      'nombreHeure': ['', Validators.required],
      'offre': ['', Validators.minLength(1)],
      'description': ['']
    });
  }

  addOrUpdateModule() {
    this.loader_action = true;
    let formValue = this.moduleForm.value;
    this.module.libelle = formValue.libelle;
    this.module.prerequis = formValue.prerequis;
    this.module.nombreVideo = formValue.nombreVideo;
    this.module.nombreHeure = formValue.nombreHeure;
    // this.module.offre = new Offre(parseInt(formValue.offre));
    this.module.idOffre = parseInt(formValue.offre);
    this.module.description = formValue.description;

    if (this.module.id > 0) {
      let index = this.modules.indexOf(this.module);
      this.service.update(this.module).subscribe(
        (result) => {
          if (index > -1) {
            this.modules.splice(index, 1);
            this.loader_action = false;
            this.modules.push(result);
            this.toasts.success('Opération éffectuée avec succès', 'Succès');
            this.annuler();
          }
        }, error => {
          this.loader_action = false;
          this.toasts.error(error.error.message);
          this.annuler();
          console.log(error);
        }
      );

    } else {
      this.service.create(this.module).subscribe(
        (result) => {
          this.loader_action = false;
          this.modules.push(result);
          this.size++;
          this.toasts.success('Opération éffectuée avec succès', 'Succès');
          this.annuler();
        },
        (error => {
          this.loader_action = false;
          this.toasts.error(error.error.message);
          this.annuler();
        })
      );
    }
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openToUpdate(content, bean: Module) {
    this.module = bean;
    this.open(content);
  }

  openToDelete(content, bean: Module) {
    this.module = bean;
    this.offreSelected = bean.offre;
    this.modalService.open(content);
  }

  annuler() {
    this.module = new Module();
    this.modalService.dismissAll();
  }

  supprimer() {
    if (this.module != null ? this.module.id > 0 : false) {
      let index = this.modules.indexOf(this.module);
      this.service.delete(this.module.id).subscribe(
        (result) => {
          this.modules.splice(index, 1);
          this.size--;
          this.toasts.success(result.message, 'succès');
          this.annuler();
        },
        error => {
          this.toasts.error(error.error.message, 'Erreur');
        }
      );
    } else {
      this.toasts.warning('Veuillez choisir le module que vous voulez supprime ', 'Warning');
    }
  }

}
