import {Module} from './Module';

export class Cours {
  id: number;
  libelle: string;
  description: string;
  nombreHeure: number;
  pathImage: string;
  path: string;
  module: Module;
  datesave: Date;
}
