import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import {NavbarComponent} from './navbar/navbar.component';


import {UsersService} from './users/users.service';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';

import {SearchPipe} from './users/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import {TokenInterceptor} from './interceptor/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PaginationService} from './pagination/pagination.service';
import {PaginationComponent} from './pagination/pagination.component';
import {SpinnerComponent} from './shared/spiner.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserPageComponent,
    SearchPipe,
    NavbarComponent,
    SpinnerComponent,
    PaginationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, BrowserAnimationsModule // imports firebase/storage only needed for storage features
  ],
  providers: [UsersService, AuthService, AuthGuard, PaginationService, TokenInterceptor,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
