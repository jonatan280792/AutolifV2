import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAircraftComponent } from './aircraft.component';

const routes: Routes = [
  { path: '', component: PageAircraftComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AircraftRouting { }
