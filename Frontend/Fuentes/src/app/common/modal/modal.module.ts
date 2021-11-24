import {
  NgModule, NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { RouterModule } from '@angular/router';

const imports = [
  CommonModule,
  RouterModule,
];

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: imports,
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})

export class ModalModule {}
