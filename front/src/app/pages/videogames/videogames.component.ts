import { Component, Input, OnInit } from '@angular/core';
import { VideogamesInterface } from './../../models/videogames.interfaces';


@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss']
})
export class VideogamesComponent implements OnInit {

  @Input() public videogamesList!: VideogamesInterface[];



  constructor() { }

  ngOnInit(): void {
  }

}
