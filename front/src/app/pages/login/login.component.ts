import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../../models/videogames.interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public user: UserInterface = {
    email:'',
    password: ''
  };

  constructor(public formBuilder: FormBuilder, public router: Router, public authService: AuthService ) {
    this.userForm = this.formBuilder.group ({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }


  public onSubmit = () => {
    this.user = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
    }
    this.authService.signIn(this.user);
   
    this.userForm.reset(); 
  }
}
