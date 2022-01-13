import {Offre} from './Offre';

export class Module {
  id: number;
  libelle: string;
  description: string;
  prerequis: string;
  nombreVideo: number;
  nombreHeure: number;
  idOffre: number;
  path: string;
  offre: Offre;
  dateSave: Date;
  dateUpdate: Date;

  constructor(id: number) {
    this.id = id;
  }

  // @ts-ignore
  constructor();

}
