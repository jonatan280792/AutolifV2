import {
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routes';
import { RouterModule } from '@angular/router';
import { LoginService } from '@services/login-services';
import { ServiceUtils } from '@services/services-utils';
import { SessionService } from '@services/session-service';
import { ModalService } from '@common/modal/modal.service';

const components = [LoginComponent];

const imports = [
  CommonModule,
  LoginRouting,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  RouterModule,
];

const providers = [
  LoginService,
  ModalService,
  ServiceUtils,
  SessionService
];

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
