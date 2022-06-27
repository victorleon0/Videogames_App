import { VideogamesInterface } from './../../models/videogames.interfaces';
import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss'],
})
export class VideogamesComponent implements OnInit {
  public videogamesList: VideogamesInterface[] = [];
  public inputSearch: string = '';

  constructor(
    private videogamesService: VideogamesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVideogames();
  }

  public getVideogames = () => {
    this.videogamesService.getVideogames().subscribe((data: any) => {
      this.videogamesList = data;
    });
  };

  public filterVideogames = (filter: string) => {
    if (filter === '') {
      this.getVideogames();
    } else {
      this.videogamesList = this.videogamesList.filter((game) =>
        game.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  public selectedToEdit = (videogame: VideogamesInterface) => {
    this.videogamesService.sendItemToEdit(videogame);
    this.router.navigate(['gestion']);
  };

  public orderVideogamesByTitle = ( sort: string) => {
    if (sort === 'mayor') {
      this.videogamesList = this.videogamesList.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sort === 'menor') {
      this.videogamesList = this.videogamesList.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
  };
}
