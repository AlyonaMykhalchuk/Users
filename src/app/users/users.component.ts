import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UsersService} from './users.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UsersService, AuthService]
})
export class UserComponent implements OnInit {
  // template types
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedUser: User;
  users: Array<User>;
  isNewRecord: boolean;
  statusMessage: string;
  searchStr = '';
  constructor(
    private serv: UsersService,
     private auth: AuthService
  ) {
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.loadUsers();
  }
  // changeAuthStatus(status: string) {
  //   if (status === 'login') {
  //     this.auth.login();
  //   } else {
  //     this.auth.logOut();
  //   }
  // }
  // loading user
  private loadUsers() {
    this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  // adding user
  addUser() {
    this.editedUser = new User(0, '', '',  '' , '');
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  // editing user
  editUser(user: User) {
    this.editedUser = new User(user.id, user.firstname, user.lastname, user.email, user.password);
  }
  // load one of two templates
  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
 // saving user
  saveUser() {
    if (this.isNewRecord) {
      // add a user
      this.serv.createUser(this.editedUser).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // change the user
      this.serv.updateUser(this.editedUser.id, this.editedUser).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadUsers();
      });
      this.editedUser = null;
    }
  }
  // cancel editing
  cancel() {
    // if canceled when adding, we will delete the last record
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }
  // delete user
  deleteUser(user: User) {
    this.serv.deleteUser(user.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadUsers();
    });
  }
}
