import { Component, OnInit } from '@angular/core';
import { NavigatorInterface } from 'src/app/models/videogames.interfaces';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  public navbarInfo:NavigatorInterface;

  constructor() {
    this.navbarInfo={
      logo:{
        src:"../../../assets/iconsHeader",
        alt:"lcons"
      },
      links:[{
        text:"Home",
        link:"/home"
      },
      {
        text:"Gestion",
        link:"/gestion"
      },
      {
        text:"Videogames",
        link:"/videogames"
      },

     ]
    }
   }

  ngOnInit(): void {
  }

}
