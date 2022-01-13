import {Module} from './Module';

export class Offre {
  id: number;
  libelle: string;
  description: string;
  montant: number;
  taxe: number = 1;
  duree: number;
  dateSave: Date;
  dateUpdate: Date;
  reduction: number;
  note: number;
  nombreModule;
  modules:Module[];


  constructor(id: number) {
    this.id = id;
  }

  // @ts-ignore
  constructor();
}
