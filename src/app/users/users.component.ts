import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UsersService} from './users.service';
import {AuthService} from '../auth.service';
import {PaginationService} from '../pagination/pagination.service';


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
  pager: any = {};
  pagedItems: any[];

  constructor(
    private userService: UsersService,
    private paginationService: PaginationService
  ) {
    this.users = [];
  }

  ngOnInit() {
    this.loadUsers();

  }

  // loading user
  private loadUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.setPage(1);
     });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.paginationService.getPager(this.users.length, page);
    // get current page of items
    this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  // adding user
  addUser() {
    this.editedUser = new User('', '', '', '', '');
    this.pagedItems.push(this.editedUser);
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
      this.userService.createUser(this.editedUser).then(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // change the user
      this.userService.updateUser(this.editedUser.id, this.editedUser).then(data => {
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
      this.pagedItems.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }

  // delete user
  deleteUser(user: User) {
    this.userService.deleteUser(user.id).then(data => {
      this.statusMessage = 'Данные успешно удалены';
        this.loadUsers();
    });
  }

}


