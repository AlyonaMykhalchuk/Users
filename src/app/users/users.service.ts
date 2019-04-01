import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.usersCollection = this.afs.collection('users');
  }

  getUsers() {
    this.users = this.usersCollection.snapshotChanges().pipe(map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as User;
        data.id = document.payload.doc.id;
        return data;
      });
    }));
    return this.users;
  }

  createUser(user: User) {
    return this.usersCollection.add(Object.assign({}, user));
  }

  updateUser(id: string, user: User) {
    return this.usersCollection.doc(id).set(Object.assign({}, user));
  }

  deleteUser(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
