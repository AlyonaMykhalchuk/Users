import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {delay, mergeMap} from 'rxjs/operators';
import {LoaderService} from '../shared/spiner/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AngularFireAuth,
    private loaderService: LoaderService
  ) {
    console.log('token interceptor constructor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showingSpinner();
    return this.auth.idToken.pipe(
      delay(100),
      mergeMap((token: any) => {
        console.log(token);
        if (token) {
          request = request.clone({ setHeaders: { Authorization: 'Bearer ${token}' } });
        }

        this.loaderService.hideSpinner();
        return next.handle(request);

      }));
  }
}
