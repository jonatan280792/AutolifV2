import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@services/theme-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Frontend';

  isDarkBlue: Observable<boolean>;
  isDarkPink: Observable<boolean>;
  optionTheme: Observable<string>;

  constructor(
    public translate: TranslateService,
    private themeService: ThemeService
  ) {
    const browserLang = translate.getBrowserLang();

    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  ngOnInit() {
    this.isDarkBlue = this.themeService.isDarkBlue;
    this.isDarkPink = this.themeService.isDarkPink;
    this.optionTheme = this.themeService.optionTheme;
  }
}
