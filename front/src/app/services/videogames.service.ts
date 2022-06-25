import { VideogamesInterface } from './../models/videogames.interfaces';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {
  public URL: string = "http://localhost:3000/videogames";


  constructor(private httpClient: HttpClient) { }

  public itemToPreview: any = {
    id: '',
    title: '',
    company: '',
    cover: '',
    platform: [],
    year: 0,
    genre: ''
  }
  
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


  public getVideogames = () => {
    return this.httpClient.get(this.URL);
  }

  public postVideogame = (newVideogame: any) => {
    return this.httpClient.post(this.URL, newVideogame);
  } 

  

 
}
