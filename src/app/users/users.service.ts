// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {User} from './user';
//
// @Injectable()
// export class UsersService {
//
//   private url = 'http://5c8bcb35a0bb650014f03b86.mockapi.io/users';
//   constructor(private http: HttpClient) { }
//
//   getUsers() {
//     return this.http.get(this.url);
//   }
//
//   createUser(user: User) {
//     return this.http.post(this.url, user);
//   }
//   updateUser(id: number, user: User) {
//     return this.http.put(this.url + '/' + id, user);
//   }
//   deleteUser(id: number) {
//     return this.http.delete(this.url + '/' + id);
//   }
// }


import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from './user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map, scan} from 'rxjs/operators';

@Injectable()
export class UsersService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor (
    private afs: AngularFirestore,

  ) {
    this.usersCollection = this.afs.collection('users');
  }

  getUsers() {
    this.users = this.usersCollection.snapshotChanges().pipe(map(collection => {
        return collection.map(document => {
          const data = document.payload.doc.data() as User;
          data.id = Number(document.payload.doc.id);
          return data;
        });
      }));
    return this.users;
  }

  createUser(user: User) {
    const id = this.findMax();
    user.id = this.findMax();
    return this.usersCollection.doc(id.toString()).set(Object.assign({}, user));
  }

  updateUser (id: number, user: User) {
    return this.usersCollection.doc(String(id)).set(Object.assign({}, user));
  }

  deleteUser (id: number) {
    return this.usersCollection.doc(String(id)).delete();
  }

  findMax(): number {

    let ids = [];

    this.users.subscribe((data: User[]) => {
      ids = data;
    });

    if (ids.length === 0) {
      return 1;
    }

    let userId = 1;
    ids.forEach(a => {
      if ( Number(a.id) > userId) {
        userId = Number(a.id);
      }
    });

    return Number(userId + 1);
  }
}
