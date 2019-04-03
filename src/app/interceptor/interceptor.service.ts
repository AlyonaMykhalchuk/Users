import { AngularFireAuth } from '@angular/fire/auth';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {delay, mergeMap} from 'rxjs/operators';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnInit {

  constructor(private auth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor works');
    return this.auth.idToken.pipe(
      mergeMap((token: any) => {
        console.log(token);
        if (token) {
          request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        return next.handle(request);

      }));
  }

  ngOnInit(): void {
    console.log('Interceptor creation');
  }
}
