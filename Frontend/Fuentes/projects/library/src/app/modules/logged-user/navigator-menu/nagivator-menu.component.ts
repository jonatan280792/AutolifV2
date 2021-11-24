import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { onSideNavChange, animateText } from '@common/library/animations/animations';
import { SidenavService } from '@services/library/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '@services/session-service';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  animations: [onSideNavChange, animateText],
  selector: 'app-navigator-menu',
  templateUrl: './navigator-menu.html'
})

export class NavigatorMenuComponent implements OnInit {
  public sideNavState = true;
  public linkText = true;
  menu: any;
  userData: any;

  constructor (
    private sessionService: SessionService,
    private sidenavService: SidenavService,
    private translate: TranslateService
  ) {
    // this.translate.setDefaultLang('es');
    this.userData = this.sessionService.getSessionData();
    this.createMenu();
  }

  ngOnInit() {
    // this.userData = this.sessionService.getSessionData();
  }

  createMenu() {
    this.menu = [
      {
        title: 'menu.home',
        url: '/home',
        icon: 'dashboard'
      }
    ];

    if (this.userData.tipo === 'A') {
      this.menu.push(
        // {
        //   title: 'menu.aircraft',
        //   url: 'aircraft',
        //   icon: 'avion'
        // },
        {
          title: 'menu.pilots',
          url: 'pilot',
          icon: 'piloto'
        }
      );
    } else if (this.userData.tipo === 'P') {
      this.menu.push(
        {
          title: 'menu.pilots',
          url: 'pilot',
          icon: 'piloto'
        }
      );
    } else {
      this.menu.push(
        {
          title: 'menu.aircraft',
          url: 'aircraft',
          icon: 'avion'
        }
      );
    }
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }
}
