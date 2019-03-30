import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable()
export class LoginService {
  constructor() {}
}
//
//   private url = 'https://reqres.in/api/login';
//   private loggedIn = false;
//
//   constructor(private http: HttpClient) {
//     this.loggedIn = !!localStorage.getItem('auth_token'); }
//   login(username: string, password: string): Observable<any> {
//     return this.http.post('https://reqres.in/api/login', {email: username, password})
//     this.loggedIn = true;
//           }
//   logout() {
//     localStorage.removeItem('auth_token');
//     this.loggedIn = false;
//   }
//   isLoggedIn() {
//     return this.loggedIn;
//   }
//   }
// //   login(credentials: Credentials) {
// //     return console.log(this.http.post(this.url, credentials));
// //   }
// // }



