import { PlatformInterface } from './../../../models/videogames.interfaces';
import { VideogamesService } from 'src/app/services/videogames.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateYear, checkedRequired } from 'src/app/validators/form.validators';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() public errorCover!: boolean;
  public videogamesForm!: FormGroup;
  //ESta var se cargara con los valores iniciales en edicion
  public newVideogame = this.videogamesService.videogameData;
  public idVideogame = this.videogamesService.videogameData.id;
//Mirar si es util, porque de momento no la veo usada en ningun sitio
  public submitted: boolean = false;
//Para cambiar el texto del boton segun sea add o edit
  public btnText:string = 'Add';

  public showToConfirmDelete: boolean = false;  
  
  
  public plataformsList: PlatformInterface[] = [
    { id:0, value:'PlayStation'},
    { id:1, value:'Nintendo Switch'},
    { id:2, value:'Xbox'},
    { id:3, value:'PC'}
  ];

  public genreList: string[] =[
    "Adventures", "Action", "RPG", "Platforms", "Sports",
    "Shooter", "Fighting", "Survival Horror", "Strategy"
  ]

  

  //Copiado para implementar las formArray en el campo platform
  get ordersFormArray() {
    return this.videogamesForm.controls['platform'] as FormArray;
  }

  constructor(private videogamesService: VideogamesService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.videogamesService.videogameClear();

   
    this.videogamesForm = this.formBuilder.group({
      title: [this.newVideogame.title,[Validators.required]],
      company: [this.newVideogame.company,[Validators.required]],
      cover: [this.newVideogame.cover,{ validator: Validators.required, updateOn: 'blur'}], //,[ Validators.required]],
      genre: [this.newVideogame.genre,[Validators.required]],
      year: [this.newVideogame.year,[Validators.required]],
      play: [this.newVideogame.play],
      platform: new FormArray([])
    },
    {
      validator: [validateYear('year'),
        checkedRequired('platform')]
    })

    //Copiado para implementar las formArray en el campo platform
    //Si no hay indice se incializa el array de platform a false, todos desmarcados
    if(this.newVideogame.id === '' || this.newVideogame === 0){
      this.addCheckboxes();
    }else{ //Todo esto es para intentar cargar el valor de los checkbox en su posicion correcta cuando esta el modo edicion
      this.btnText = 'Edit';
      const auxList:any = [];
      this.newVideogame.platform.forEach((element:any, index:number) =>{
        const aux = this.plataformsList.filter(filtered => element === filtered.value);
        if(aux.length > 0){
          auxList.push(aux[0].id);
        }
      })
      auxList.sort();
      const mappedCheckbox = [];
      for(let i = 0; i < this.plataformsList.length; i++){
        mappedCheckbox.push(-1);
      }
      for(let index of auxList){
        mappedCheckbox[index] = index;
      }
      for(let checkbox of mappedCheckbox){
        if(checkbox === -1){
          this.ordersFormArray.push(new FormControl(false));
        }else{
          this.ordersFormArray.push(new FormControl(true));
        }
      }
      
    }
    
    

    this.videogamesForm.valueChanges.subscribe((changes) => {
      const auxArray: string[] = [];
      this.plataformsList.forEach((element: PlatformInterface, index:number) => {
        if(changes.platform[index]){
          auxArray.push(element.value);
        }
      });
    
      this.newVideogame = {...changes, platform: auxArray };
      this.videogamesService.sendPreview(this.newVideogame);
      //Detecta si el link no funciona por el error que manda por medio del servicio el preview
      //Si el link da error cambia la var que contiene los campos editados y el input del formulario
      //con la imagen por defecto que evita que siga mandando mensajes de error
      if(this.videogamesService.errorCover){
        this.newVideogame = {...this.newVideogame, cover: '../../assets/images/no-image-available.jpg'};
        this.videogamesService.errorCover = false;
        this.videogamesForm.controls['cover'].setValue('../../assets/images/no-image-available.jpg');
      }
    })

  }

  public validateLink = () => {
    
  }

  //Copiado para implementar las formArray en el campo platform
  private addCheckboxes() {
    this.plataformsList.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }


 
  public onSubmit = () => {
    if(this.idVideogame === '' || this.idVideogame === 0){ //Post si no hay id
      this.videogamesService.postVideogame(this.newVideogame).subscribe();
    }else{ //El put se hace si ya existe el id 
      this.videogamesService.putVideogame(this.idVideogame, this.newVideogame).subscribe();
      this.router.navigate(['videogames']);
    }
    this.videogamesForm.reset();
  }

  //En vez de borrar directamente saca una ventana para que se confirme la seleccion
  public confirmDelete = (gonnaDelete: boolean) => {
    if(gonnaDelete){
      this.videogamesService.deleteVideogame(this.idVideogame).subscribe();
      this.videogamesService.videogameClear();
      this.router.navigate(['videogames']);
    }
    this.showToConfirmDelete = false;
  }

  //Esta funcion se le llama cuando se clickea el btn delete, pone un boleano a true para que muestre 
  //la ventana de confirmacion de borrado, la funcion que esta arriba, que es la que realmente borra 
  //si se le da al boton de Yes y solo vuelve a ocultar la venta si se clickea el cancel
  public deleteSelected = () => {
    this.showToConfirmDelete = true;
  }



}
