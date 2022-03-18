import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from '@config/index';
import { ServicesRoutes } from './services-routes';
import { ServiceUtils } from './services-utils';
import { SessionService } from './session-service';
import { sessionPersistence } from '@utils/session-persistence.util';
import { ModalService } from '@common/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private timeoutEvents: string[];
  private logoutTimeout: any;
  private warnTimeout: any;
  // private modalWarn: ModalAlert;
  // private modalLogout: ModalAlert;
  public warnLogoutMins: number;
  public autoLogoutMins: number;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private serviceUtils: ServiceUtils,
    private sessionService: SessionService,
  ) {
    this.timeoutEvents = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
    this.warnLogoutMins = Config.appParams.session.timeoutWarningMinutes;
    this.autoLogoutMins = Config.appParams.session.timeoutLogoutMinutes;
    // this.restartLogoutTimeout = this.restartLogoutTimeout.bind(this);
    // this.clearLogoutTimeouts = this.clearLogoutTimeouts.bind(this);
    // this.setLogoutTimeouts = this.setLogoutTimeouts.bind(this);
    // this.warnLogout = this.warnLogout.bind(this);
    // this.autoLogout = this.autoLogout.bind(this);
    this.logout = this.logout.bind(this);
  }

  public doLogin(data: any): Observable<any> {
    return this.serviceUtils.buildRequest(ServicesRoutes.doLogin, 'post', data);
  }

  public initSessionTimeout() {
    // this.clearLogoutTimeouts();
    this.timeoutEvents.forEach(event => {
      // window.removeEventListener(event, this.restartLogoutTimeout);
      // window.addEventListener(event, this.restartLogoutTimeout);
    });
 
    // this.setLogoutTimeouts(event);
  }

  logout() {
    this.closeAllModals();
    this.sessionService.removeSessionData();
    this.sessionService.removeToken();
    this.router.navigateByUrl('/login');
    // this.clearLogoutTimeouts();
    this.timeoutEvents.forEach(event => {
      // window.removeEventListener(event, this.restartLogoutTimeout);
    });
  }

  private closeAllModals() {
    const modalOpen = sessionPersistence.get('idModal');
 
    if (modalOpen) {
      this.modalService.close(modalOpen);
    }
  }
}
