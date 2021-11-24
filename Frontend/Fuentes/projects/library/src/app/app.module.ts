import {
  HttpClient, HttpClientModule
} from '@angular/common/http';
import {
  ModuleWithProviders, NgModule
} from '@angular/core';
import {
  TranslateLoader, TranslateModule
} from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Config } from '@config/index';
import { LoggedUserModule } from '@modules/library/logged-user/logged-user.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { RouterModule } from '@angular/router';
import { SidenavService } from '@services/library/sidenav.service';
import { NgxCurrencyModule } from 'ngx-currency';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: Config.appParams.translatesPathlibrary,
      suffix: '.json'
    }
  ]);
}

const declarations = [
  AppComponent,
];

const imports = [
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  NgxCurrencyModule,
  LoggedUserModule,
  RouterModule.forRoot(
    AppRoutes,
    {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      useHash: true
    }
  ),
  TranslateModule.forRoot({ loader: {
    deps: [HttpClient],
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory
  }})
];

const providers = [
  SidenavService
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [declarations],
  imports: [imports],
  providers: providers
})
export class AppModule {}

export class ApplibraryModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: providers,
    };
  }
}
