import {Client} from './Client';
import {Offre} from './Offre';

export class AbonnementClient{
  id:number;
  client:Client;
  offre:Offre;
  duree:number;
  dateDebut:Date;
  dateFin:Date;
  actif:boolean;
  
}
