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
  // типы шаблонов
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedUser: User;
  users: Array<User>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(
    private serv: UsersService,
     private auth: AuthService
  ) {
    this.users = new Array<User>();
  }

  ngOnInit() {
    this.loadUsers();
  }
  changeAuthStatus(status: string) {
    if (status === 'login') {
      this.auth.logIn();
    } else {
      this.auth.logOut();
    }
  }
  // загрузка пользователей
  private loadUsers() {
    this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  // добавление пользователя
  addUser() {
    this.editedUser = new User(0, '', '',  '' , '');
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editUser(user: User) {
    this.editedUser = new User(user.id, user.firstname, user.lastname, user.email, user.password);
  }
  // загружаем один из двух шаблонов
  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveUser() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createUser(this.editedUser).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // изменяем пользователя
      this.serv.updateUser(this.editedUser.id, this.editedUser).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadUsers();
      });
      this.editedUser = null;
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }
  // удаление пользователя
  deleteUser(user: User) {
    this.serv.deleteUser(user.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadUsers();
    });
  }
}
