import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from './credentials';



@Injectable()
export class LoginService {

  private url = 'https://reqres.in/api/login';
  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    return console.log(this.http.post(this.url, credentials));
  }
}
