import { NgModule } from '@angular/core';
import { PageHomeComponent } from './home.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
// import { ChartsModule, ThemeService } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { HomeRouting } from './home.routing';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnackBarService } from '@common/snack-bar/snack-bar-service';
import { LibraryService } from '@app/library/services/library-services';
import { ServiceUtils } from '@services/services-utils';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { Config } from '@config/index';
import {
  TranslateLoader, TranslateModule
} from '@ngx-translate/core';
import { ControlProductsModule } from './control-products/control-products.module';
import { ModalService } from '@common/modal/modal.service';
import { ModalModule } from '@common/modal/modal.module';
import { ControlFinishModule } from './control-finish/control-finish.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: Config.appParams.translatesPathlibrary,
      suffix: '.json'
    }
  ]);
}

@NgModule({
  declarations: [
    PageHomeComponent
  ],
  exports: [PageHomeComponent],
  imports: [
    CommonModule,
    HomeRouting,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    ControlFinishModule,
    ControlProductsModule,
    MatDividerModule,
    ModalModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatTableModule,
    // ChartsModule,
    RouterModule,
    TranslateModule.forRoot({ loader: {
      deps: [HttpClient],
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory
    }})
  ],
  providers: [
    LibraryService,
    ModalService,
    ServiceUtils,
    SnackBarService
  ],
})
export class HomeModule {}
