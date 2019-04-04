import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  statusMassage: string = '';

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
        this.statusMassage = 'Wrong password or email!!!' + ' ' +
          ''
          + 'Hint:' + '' +
          '' +
          'Login:admin@mail.ru'
          + ' ' + 'Password: 1A2b3456'
        console.log(err);
      });

  }
}






