import { VideogamesInterface } from './../../../models/videogames.interfaces';
import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public itemPreview: VideogamesInterface;
  

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
    this.videogamesService.receivePreview().subscribe((preview) => {
      this.itemPreview = preview;
      //console.log('preview', this.itemPreview);
    })
  }


  //En el caso que la ruta de la imagen no exista, se pone por defecto una imagen
  public getError = (event:any):void => { 
    this.itemPreview.cover = '../../assets/images/no-image-available.jpg';
  }

}
