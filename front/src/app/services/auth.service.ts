import { UserInterface } from '../models/videogames.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router) { }

  public signIn = (user:UserInterface) => {
    return this.httpClient.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res:any) => {
        localStorage.setItem('access-token', res.token)
        this.currentUser = res;
        this.router.navigate(['gestion']);
      })
  }

 get isLoggedIn():boolean {
  let authToken = localStorage.getItem('access-token');
  return (authToken !== null) ? true : false;
 }

 public logOut = () => {
  let removeToken = localStorage.removeItem('access-token');
  if(removeToken == null){
    this.router.navigate(['login']);
  }
 }

 public getToken = () => {
  return localStorage.getItem('access_token');
}

 public handleError = (err: HttpErrorResponse) => {
  let msg = '';
  if(err.error instanceof ErrorEvent){
    msg = err.error.message;
  }else{
    msg = `Error code ${err.status}\nMessage: ${err.message}`;
  }
  return throwError(msg);
 }

}
