import {
  localSessionPersistence,
  sessionPersistence,
} from '@utils/session-persistence.util';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private token: string;
  private sessionData: any;

  constructor() {
    const userData = sessionPersistence.get('userData');

    if (userData) {
      this.saveSessionData(userData);
    }

    this.patchSessionData = this.patchSessionData.bind(this);
  }

  getToken() {
    return this.token || '';
  }

  setToken(token: string) {
    this.token = token;
  }

  removeToken() {
    this.token = null;
  }

  isAuthenticated() {
    this.token = sessionStorage.getItem('token');
    return this.token && this.token !== '';
  }

  getSessionData() {
    const userData = sessionPersistence.get('userData');

    if (userData) {
      this.saveSessionData(userData);
    }
    return this.sessionData;
  }

  patchSessionData(data) {
    Object.assign(this.sessionData, data);
    this.saveSessionData(this.sessionData);

    return this.sessionData;
  }

  setSessionToken() {
    return sessionPersistence.get('token');
  }

  saveSessionToken(data: any) {
    this.setToken(data);
    sessionPersistence.setRawString('token', data);
  }

  removeSessionToken() {
    sessionStorage.removeItem('token');
    return sessionPersistence.delete('token');
  }

  saveSessionData(data: any) {
    this.setToken(data.token);
    sessionPersistence.set('userData', data);
    this.sessionData = data;
  }

  logoutUser() {
    sessionPersistence.deleteAll();
    localSessionPersistence.deleteAll();
  }

  removeSessionData() {
    sessionPersistence.delete('userData');
    sessionPersistence.delete('token');
    sessionPersistence.deleteAll();
    this.sessionData = null;
  }
}
