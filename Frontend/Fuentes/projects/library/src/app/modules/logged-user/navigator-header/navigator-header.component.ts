import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { ThemeService } from '@services/theme-service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { sessionPersistence, localSessionPersistence } from '@utils/session-persistence.util';
import { TranslateService } from '@ngx-translate/core';
import { ViewEncapsulation } from '@angular/core';
import { LoginService } from '@services/login-services';

@Component({
  selector: 'app-navigator-header',
  templateUrl: './navigator-header.html',
  // encapsulation: ViewEncapsulation.None
})
export class NavigatorHeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public language: string;
  public theme: string;
  public themeList = [
    { businessCode: '1', description: 'logged-user.themes.theme1', icon: 'blueWhite' },
    { businessCode: '2', description: 'logged-user.themes.theme2', icon: 'pinkBlack' },
    { businessCode: '3', description: 'logged-user.themes.theme3', icon: 'blueBlack' }
  ];

  languages: any = [
    { value: 'es', description: 'Español', icon: 'spanish' },
    { value: 'en', description: 'Ingles', icon: 'english' },
  ];

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private translate: TranslateService,
    private overlayContainer: OverlayContainer
  ) {
    const browserLang = translate.getBrowserLang();
    this.translate.setDefaultLang(browserLang);
    this.loadLanguage();
    if (localSessionPersistence.get('theme')) {
      this.changeTheme(localSessionPersistence.get('theme').toString());
    }
  }

  ngOnInit() {}

  loadLanguage() {
    this.language = sessionPersistence.get('language');
    
    if (this.language) {
      this.useLanguage(this.language);
    }
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkBlue(checked);
  }

  changeTheme(theme: string) {
    this.theme = theme;
    localSessionPersistence.setRawString('theme', theme);
    const checked = true;
    if (theme === '2') {
      this.themeService.setDarkPink(checked);
      this.themeService.setDarkBlue(false);
      this.themeService.setColorTheme('pinkDark');
      this.overlayContainer.getContainerElement().classList.add('blue-dark');
    } else if (theme === '3') {
      this.themeService.setDarkBlue(checked);
      this.themeService.setDarkPink(false);
      this.themeService.setColorTheme('blueDark');
      this.overlayContainer.getContainerElement().classList.add('blue-dark');
    } else {
      this.themeService.setDarkBlue(false);
      this.themeService.setDarkPink(false);
      this.overlayContainer.getContainerElement().classList.remove('blue-dark');
    }
  }

  useLanguage(language: string) {
    this.language = language;

    localSessionPersistence.setRawString('language', 'es');
    this.translate.use(this.language);
  }

  logout(url) {
    this.loginService.logout();
    // window.location.href = 'http://localhost:4200/#' + url;
  }
}
