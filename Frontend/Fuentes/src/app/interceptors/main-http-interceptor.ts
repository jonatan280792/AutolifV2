import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retryWhen, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '@services/login-services';
import { SessionService } from '@services/session-service';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {

  constructor(
    //private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {

        }
      }),
      catchError(err => {
        if (err.status === 403) {
          // this.sessionService.removeSessionData();
          this.sessionService.removeSessionData();
          this.router.navigate(['/login']);
        } else if (err.status === 401) {
          this.sessionService.removeSessionData();
          // this.loginService.logout();
        }

        const error = err.error.message || err.statusText;

        return throwError(error);
      }), map(event => {
        if (event instanceof HttpResponse) {

        }
        return event;
      }), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    return throwError(error);

  }
}