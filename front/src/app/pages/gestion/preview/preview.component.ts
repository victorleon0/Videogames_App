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
    })
  }



}
