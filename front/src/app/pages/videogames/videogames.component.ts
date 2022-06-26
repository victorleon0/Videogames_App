<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { VideogamesInterface } from './../../models/videogames.interfaces';

=======
import { VideogamesInterface } from './../../models/videogames.interfaces';
import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/app/services/videogames.service';
import { Router } from '@angular/router';
>>>>>>> form-edit

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss']
})
export class VideogamesComponent implements OnInit {
<<<<<<< HEAD

  @Input() public videogamesList!: VideogamesInterface[];



  constructor() { }
=======
  public videogamesList: VideogamesInterface[] = [];
  constructor(private videogamesService: VideogamesService, private router: Router) { }
>>>>>>> form-edit

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
