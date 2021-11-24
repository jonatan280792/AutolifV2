import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CustomIconService } from '@common/library/custom-icons/custom-icon.service';
import { SidenavService } from '@services/library/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { onMainContentChange } from '@common/library/animations/animations';
import { TranslateService } from '@ngx-translate/core';
import { setLanguage } from '@utils/index';

@Component({
  animations: [onMainContentChange],
  selector: 'app-logged-user',
  templateUrl: './logged-user.html',
})
export class LoggedUserComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;
  public onSideNavChange: boolean;

  constructor (
    private customIconService: CustomIconService,
    private sidenavService: SidenavService,
    private translate: TranslateService,
  ) {
    this.customIconService.init();
    this.translate.setDefaultLang(setLanguage('language'));
    this.sidenavService.sideNavState$.subscribe( res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit() {}

  controlSidenav() {}
}
