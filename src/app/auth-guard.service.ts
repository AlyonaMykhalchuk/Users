import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators/map';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';



@Injectable()

export class AuthGuard implements CanActivate {
constructor(
  private router: Router,
  private afAuth: AngularFireAuth
) {}
  canActivate(): Observable<boolean> {
 return this.afAuth.authState.map(auth => {
   if (!auth) {
     this.router.navigate(['/login'])
       return false;
   } else {
     return true;
   }
 });
    }
}



// import {CanActivate, Router} from '@angular/router';
// import {LoginService} from './login/login.service';
// import {Injectable} from '@angular/core';
// import {AuthService} from './auth.service';
//
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//
//
//   constructor(
//     private authService: LoginService,
//     private router: Router) {
//   }
//
//   canActivate() {
//     const isLogin = this.authService.isLoggedIn();
//     if (isLogin) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
