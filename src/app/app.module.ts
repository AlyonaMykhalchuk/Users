import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {UsersService} from './users/users.service';
import {LoginService} from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UserComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UsersService, LoginService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
