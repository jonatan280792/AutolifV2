import { CommonModule } from '@angular/common';
import { ControlPilotComponent } from './control-pilot.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';

const components = [ControlPilotComponent];

const imports = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

const providers = [SnackBarService]

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ControlRegisterModule {}
