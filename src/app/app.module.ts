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
import {LoaderComponent} from './shared/spiner/loader.component';
import { UserPageComponent } from './user-page/user-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PaginationComponent} from './pagination/pagination.component';

import {UsersService} from './users/users.service';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';

import {SearchPipe} from './users/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import {TokenInterceptor} from './interceptor/interceptor';
import {LoaderService} from './shared/spiner/loader.service';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserPageComponent,
    LoaderComponent,
    SearchPipe,
    NavbarComponent,
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
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [UsersService, AuthService, AuthGuard, LoaderService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
