import {Component, OnInit, ViewChild} from '@angular/core';
import {Cours} from '../../../models/Cours';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Module} from '../../../models/Module';
import {ModuleService} from '../../../services/module.service';
import {CourService} from '../../../services/cour.service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Offre} from '../../../models/Offre';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {

  loader = false;
  loader_action = false;
  size = 0;
  cours: Cours[] = [];
  totalElementperPage = 10;
  page = 1;
  totalLenth: number;
  current = new Cours();
  coursForm: FormGroup;
  modules: Module[] = [];
  files: FileList;
  resource: string[];

  afuConfig = {
    uploadAPI: {
      url: "https://example-file-upload-api"
    },
    maxSize: "100",
    theme: "dragNDrop",
    formatsAllowed: ".mp4",
  };

  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective;

  constructor(private modalService: NgbModal, private moduleService: ModuleService, private formBuilder: FormBuilder,
              private service: CourService, private toasts: ToastrService, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.toasts.overlayContainer = this.toastContainer;
    this.initForm();
    this.getAllModules();
    this.getAll(this.page, this.totalElementperPage);

  }

  getAll(page: number, taille: number) {
    this.loader = true;
    this.service.all(page, taille).subscribe(
      (result) => {
        this.cours = result.content;
        this.size = result.totalElements;
        this.totalLenth = result.totalElements;
        this.loader = false;
      }, error => {
        this.loader = false;
        this.size = 0;
      }
    );
  }

  initForm() {
    this.coursForm = this.formBuilder.group({
      'libelle': ['', Validators.required],
      // 'pathImage': [''],
      // 'path': [''],
      'file': [''],
      'description': [''],
      'nombreHeure': ['', Validators.required],
      'module': ['', Validators.required]
    });

  }

  selectFiles(event) {
    this.files = event.target.files;
  }

  getAllModules() {
    this.moduleService.getAll(this.page, this.totalElementperPage).subscribe(
      (result) => {
        this.modules = result.content;
      }
    );
  }

  addOrUpdateCours() {
    this.loader_action = true;
    if (typeof this.files !== 'undefined' || this.files != null){
      this.upload();
    } else {
      this.addOrUpdate('');
    }
  }

  upload() {
    let path = '';
    let count: number = 0;
    console.log('File', this.files);
    for (let i = 0; i < this.files.length; i++) {
      this.uploadService.upload(this.files[i]).subscribe(
        (event) => {
          this.toasts.success('Fichier : ' + this.files[i].name + '\n' + event.message, 'Telechargement Terminé');
          path = path + ';' + event.url;
          count++;
          console.log('Count ' + count);
          if(count === this.files.length) {
            this.addOrUpdate(path);
          }
        },
        (error) => {
          console.log('error : ', error);
          this.toasts.error('Error : ' + error.error);
          this.annuler();
        }
      );
    }
  }

  addOrUpdate(path) {
    let formValue = this.coursForm.value;
    this.current.libelle = formValue.libelle;
    this.current.nombreHeure = formValue.nombreHeure;
    this.current.path = '' + path;
    //this.current.pathImage = '' + path;
    this.current.description = formValue.description;
    this.current.module = new Module(parseInt(formValue.module));

    if (this.current != null ? this.current.id > 0 : false) {
      let index = this.cours.indexOf(this.current);
      this.service.update(this.current).subscribe(
        (result) => {
          if (index > -1) {
            this.cours.splice(index, 1);
            this.loader_action = false;
            this.cours.push(result);
            this.toasts.success('Opération éffectuée avec succès', 'Succès');
            this.annuler();
          }
        }, error => {
          this.loader_action = false;
          this.toasts.error(error.error.message);
          this.annuler();
        }
      );
    } else {
      this.service.create(this.current).subscribe(
        (result) => {
          this.size++;
          this.loader_action = false;
          this.cours.push(result);
          this.toasts.success('Opération éffectuée avec succès', 'Succès');
          this.annuler();
        }, error => {
          this.loader_action = false;
          this.toasts.error(error.error.message);
          this.annuler();
        }
      );
    }
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openToUpdate(content, bean: Cours) {
    this.current = bean;
    this.open(content);
  }

  openToDelete(content, bean: Cours) {
    this.current = bean;
    this.modalService.open(content);
  }

  annuler() {
    this.current = new Cours();
    this.modalService.dismissAll();
  }

  supprimer() {
    if (this.current != null ? this.current.id > 0 : false) {
      let index = this.cours.indexOf(this.current);
      this.service.delete(this.current.id).subscribe(
        (result) => {
          this.cours.splice(index, 1);
          this.toasts.success(result.message, 'Succès');
          this.size--;
          this.annuler();
        },
        error => {
          if (error.error) {
            this.toasts.error(error.error.message, 'Echec');
          } else {
            this.toasts.error(error.message, 'Echec');
          }
        }
      );
    } else {
      this.toasts.warning('Veuillez choisir une vidéo à supprimer !', 'Warning !');
    }
  }

}
