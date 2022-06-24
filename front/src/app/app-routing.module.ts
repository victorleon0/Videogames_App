import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { VideogamesComponent } from './pages/videogames/videogames.component'
import { GestionComponent } from './pages/gestion/gestion.component';

const routes: Routes = [
  {
    path: "", pathMatch: "full", component: HomeComponent
  },
  {
    path: "videogames", component: VideogamesComponent
  },
  {
    path: "gestion", component: GestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
