import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePilotComponent } from './pilot.component';

const routes: Routes = [
  { path: '', component: PagePilotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PilotRouting { }
