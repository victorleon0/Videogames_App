import { VideogamesInterface } from './../../../models/videogames.interfaces';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  
  public itemPreview: VideogamesInterface;
  public previewVideogame = this.videogamesService.videogameData;
  

  constructor(private videogamesService: VideogamesService) {
    this.itemPreview = {
      id: 0,
      title: '',
      company: '',
      cover: '',
      platform: [],
      year: 0,
      genre: ''
    }
   }

  ngOnInit(): void {
    //En el caso que este en modo edit para que cargue los datos del videogame a editar
    if(this.previewVideogame){
      this.itemPreview = this.previewVideogame;
    }

    this.videogamesService.receivePreview().subscribe((preview) => {
      this.itemPreview = preview;
    })
  }


  //En el caso que la ruta de la imagen no exista, se pone por defecto una imagen
  public getError = (event:any):void => { 
    this.itemPreview.cover = '../../assets/images/no-image-available.jpg';
    this.videogamesService.errorCover = true;
  }

}
