import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagInvoiceComponent } from './invoice.component';

const routes: Routes = [
  { path: '', component: PagInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AircraftRouting { }
