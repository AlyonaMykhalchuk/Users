import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AngularFireAuth
  ) {
    console.log('token interceptor constructor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
      mergeMap((token: any) => {
        console.log(token);
        if (token) {
          request = request.clone({ setHeaders: { Authorization: 'Bearer ${token}' } });
        }

        return next.handle(request);

      }));
  }
}
