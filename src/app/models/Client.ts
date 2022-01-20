export class Client {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code: string;
  validated: boolean;
  actif: boolean;

  // @ts-ignore
  constructor();
  
  constructor(id: number);

  constructor(id: number) {
    this.id = id;
  }

}
