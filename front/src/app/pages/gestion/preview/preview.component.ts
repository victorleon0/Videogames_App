import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public preview: any = this.videogameService.itemToPreview;

  constructor(private videogameService: VideogamesService) { }

  ngOnInit(): void {
    console.log(this.preview);
  }

}
