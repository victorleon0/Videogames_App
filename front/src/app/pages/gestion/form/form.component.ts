import { PlatformInterface } from './../../../models/videogames.interfaces';
import { VideogamesService } from 'src/app/services/videogames.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public videogamesForm!: FormGroup;
  //ESta var se cargara con los valores iniciales en edicion
  public newVideogame: any = this.videogamesService.videogameData;
//Mirar si es util
  public submitted: boolean = false;
  
  public plataformsList: PlatformInterface[] = [
    { id:0, value:'PlayStation'},
    { id:1, value:'Nintendo Switch'},
    { id:2, value:'Xbox'},
    { id:3, value:'PC'}
  ];

  public genreList: string[] =[
    "Adventures", "Action", "RPG", "Platforms", "Sports",
    "Shooter", "Fighting", "Survival Horror"
  ]

  

  //Copiado para implementar las formArray en el campo platform
  get ordersFormArray() {
    return this.videogamesForm.controls['platform'] as FormArray;
  }

  constructor(private videogamesService: VideogamesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.videogamesForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      company: ['',[Validators.required]],
      cover: ['',[Validators.required]],
      genre: ['',[Validators.required]],
      year: ['',[Validators.required]],
      platform: new FormArray([])
    })

    //Copiado para implementar las formArray en el campo platform
    this.addCheckboxes();

    this.videogamesForm.valueChanges.subscribe((changes) => {
      const auxArray: string[] = [];
      this.plataformsList.forEach((element: PlatformInterface, index:number) => {
        if(changes.platform[index]){
          auxArray.push(element.value);
        }
      });
      this.newVideogame = {...changes, platform: auxArray };
      this.videogamesService.sendPreview(this.newVideogame);
    
    
    })
  }

  //Copiado para implementar las formArray en el campo platform
  private addCheckboxes() {
    this.plataformsList.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

 
  public onSubmit = () => {
   
      this.videogamesService.postVideogame(this.newVideogame).subscribe();
    
    //En el ejemplo de Antonio lo pone en el init, comprobar, que si no funciona aqui lo cambiamos arriba
    this.videogamesService.videogameClear();
    this.videogamesForm.reset();
  }

}
