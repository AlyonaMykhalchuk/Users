import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './users/users.component';
import {AuthGuard} from './auth-guard.service';
import {UserPageComponent} from './user-page/user-page.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/:firstname/:lastname', component: UserPageComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
