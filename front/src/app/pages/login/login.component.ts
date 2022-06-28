import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserInterface } from 'src/app/models/videogames.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 public userForm:FormGroup;
 public submitted:boolean=false;
  constructor(private formBuilder:FormBuilder) {
    this.userForm=this.formBuilder.group({
      username:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.minLength(3)]],
      password:["",[Validators.required,Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
  }
  //Definimos la funcion a la hora de ejecutar el submit
  public onSubmit(){
    this.submitted=true;
    if(this.userForm.valid){
      const user:UserInterface={
        //La interrogacion que se le pone entre el valor y el punto para que en ningun caso llegue a null
        username:this.userForm.get("username")?.value,
        email:this.userForm.get("email")?.value,
        password:this.userForm.get("password")?.value
      }
      //Hacemos un JSON.stringify a user porque es un objeto y lo tenemos que convertir a string para que lo muestre en un alert el navegador
      alert(JSON.stringify(user))
      //Reseteamos el formulario al final del submit para que se quede como estaba de nuevo
      this.userForm.reset();
      // Volvemos a setear submitted como false para saber que no se esta ejecutando mi funcion submit
      this.submitted=false
    }
  }

}
