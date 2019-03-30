import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import {UsersService} from './users/users.service';
import {LoginService} from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import { UserPageComponent } from './user-page/user-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';
import {LoaderComponent} from './shared/spiner/loader.component';
import {SearchPipe} from './users/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserPageComponent,
    LoaderComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [UsersService, LoginService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
