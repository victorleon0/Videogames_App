import { VideogamesInterface } from './../../models/videogames.interfaces';
import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss']
})
export class VideogamesComponent implements OnInit {
  public videogamesList: VideogamesInterface[] = [];
  
  constructor(private videogamesService: VideogamesService, private router: Router) { }

  ngOnInit(): void {
    this.videogamesService.getVideogames().subscribe((data:any) =>{
      this.videogamesList = data;
    })
  }

  public selectedToEdit = (videogame:VideogamesInterface) => {
    this.videogamesService.sendItemToEdit(videogame);
    this.router.navigate(['gestion']);
  }

}
