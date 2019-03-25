import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Credentials} from './credentials';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

// export class LoginComponent implements OnInit{
//   constructor (private loginServ: LoginService
//   ) {}
//   Login($event) {
//     console.log("ea pltcm");
//   }
//   submit() {
//     this.loginServ.login(new Credentials('', ''));
//   }
// }


export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService) {}
   ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
   }
   onSubmit() {
    console.log(this.form);
   }
  changeAuthStatus(status: string) {
    if (status === 'username') {
      this.auth.logIn();
    } else {
      this.auth.logOut();
    }
  }

}
