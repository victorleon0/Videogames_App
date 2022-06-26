
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
  
  
})
export class GestionComponent implements OnInit {
  public errorReceived:boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  public receiveErrorInForm = (errorLink:boolean) => {
    this.errorReceived = errorLink;
    console.log(this.errorReceived);
  }

}
