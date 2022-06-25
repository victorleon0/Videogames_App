import { Observable, Subject } from 'rxjs';
import { VideogamesInterface } from './../models/videogames.interfaces';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {
  public URL: string = "http://localhost:3000/videogames";
  //Observer para que puedan detectar los cambios en la var necesaria para hacer el preview a tiempo real 
  private subject = new Subject<any>();


  constructor(private httpClient: HttpClient) { }

  //Para que preview pueda recibir los cambios actualizados del formulario, una envia y la otra recibe
  public sendPreview = (itemToPreview:VideogamesInterface) => {
    this.subject.next(itemToPreview);
  }
  public receivePreview = ():Observable<any> => {
    return this.subject.asObservable();
  }


  //Inicializar var
  public videogameData: any = {
    id: '',
    title: '',
    company: '',
    cover: '',
    platform: [],
    year: 0,
    genre: ''
  }

  //Reset del data
  public videogameClear = () => {
    this.videogameData = {
      id: '',
      title: '',
      company: '',
      cover: '',
      platform: [],
      year: 0,
      genre: ''
    }
  }

  //CRUD

  //Recoge los datos del db.json
  public getVideogames = () => {
    return this.httpClient.get(this.URL);
  }

  //Añade registro al db.json desde el form.component
  public postVideogame = (newVideogame: any) => {
    return this.httpClient.post(this.URL, newVideogame);
  } 

  
  //Para darle valores al form para editar
  public sendItemToEdit = (item: VideogamesInterface) => {
    this.videogameData = item;
  }

  

 
}
