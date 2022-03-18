import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import es from '@angular/common/locales/es';
import { AppComponent } from './app.component';
import { ApplibraryModule } from '@app/library/app.module';
import { AppRoutes } from './app-routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Config } from '@config/index';
import { CustomIconService } from '@common/custom-icons/custom-icon.service';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@services/theme-service';
import { MainHttpInterceptor } from '@interceptors/main-http-interceptor';
import { ModalService } from '@common/modal/modal.service';
// import { NgxSpinnerModule } from 'ngx-spinner';

const imports = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  // ChartsModule,
  // NgxSpinnerModule,
  RouterModule.forRoot(
    AppRoutes,
    {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      useHash: true
    }
  ),  
  ApplibraryModule.forRoot(),  
];

const providers = [ 
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: MainHttpInterceptor
  },
  CustomIconService,
  ThemeService,
  { 
    provide: MAT_DIALOG_DATA, useValue: {} 
  },
  { 
    provide: MatDialogRef, useValue: {} 
  },

];

registerLocaleData(es);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [imports],
  providers: [providers]  
})
export class AppModule { }
