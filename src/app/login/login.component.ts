import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Credentials} from './credentials';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;


  constructor (private authService: AuthService,
               private router: Router,

 ) {}
 ngOnInit () {
  // check auth state
   this.authService.checkAuth().subscribe(auth => {
     if (auth) {
       this.router.navigate(['/users']);
     }
   });
 }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(user => {
        this.router.navigate(['/users']);
      })
      .catch( err => {
        console.log(err);
      });

  }
}






// // export class LoginComponent {
// //   constructor (private loginServ: LoginService
// //   ) {}
// //   Login($event) {
// //     console.log('its ok');
// //   }
// //   submit() {
// //     this.loginServ.login(new Credentials('', ''));
// //   }
// // }
//
//
// export class LoginComponent implements OnInit {
//   form: FormGroup;
//
//   constructor(private auth: AuthService) {}
//    ngOnInit() {
//     this.form = new FormGroup({
//       'username': new FormControl(null, [Validators.required, Validators.email]),
//       'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
//     });
//    }
//    onSubmit() {
//     const formData = this.form.value;
//     console.log(formData);
//    }
//   changeAuthStatus(status: string) {
//     if (status === 'username') {
//       this.auth.logIn();
//     } else {
//       this.auth.logOut();
//     }
//   }
//
// }
