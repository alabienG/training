import { Cours } from "./Cours";

export class Resource {
    id: number;
    name: string;
    path: string;
    type: string;
    extension: string;
    cours: Cours;
    etat: number;
    dateSave: number;
    dateUpdate: number;
}
