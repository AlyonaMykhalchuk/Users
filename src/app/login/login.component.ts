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
showSpiner = true;

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






