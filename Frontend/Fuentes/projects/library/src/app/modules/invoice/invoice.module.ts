import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagInvoiceComponent } from './invoice.component';
import { CommonModule } from '@angular/common';
import { AircraftRouting } from './invoice.routes';
import { RouterModule } from '@angular/router';
import { ModalService } from '@common/modal/modal.service';
import { ModalModule } from '@common/modal/modal.module';
import {
  TranslateLoader, TranslateModule
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/index';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ControlRegisterModule } from './control-aircraft/control-aircraft.module';
import { LibraryService } from '@app/library/services/library-services';
import { ServiceUtils } from '@services/services-utils';
import { SessionService } from '@services/session-service';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrintModule } from '@common/library/print/print.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: Config.appParams.translatesPathlibrary,
      suffix: '.json'
    }
  ]);
}

const components = [PagInvoiceComponent];

const imports = [
  CommonModule,
  ControlRegisterModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTableModule,
  ModalModule,
  AircraftRouting,
  RouterModule,
  PrintModule,
  TranslateModule.forRoot({ loader: {
    deps: [HttpClient],
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory
  }})
];

const providers = [
  ModalService,
  LibraryService,
  ServiceUtils,
  SessionService,
  SnackBarService
];

@NgModule({
  declarations: components,
  exports: components,
  imports: imports,
  providers: providers,
  // schemas: [NO_ERRORS_SCHEMA]
})
export class InvoiceModule { }
