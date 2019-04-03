import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users, searchStr: string) {
    if (users.length === 0 || searchStr === '') {
      return users;
    }
    return users.filter(user => user.firstname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
      || user.lastname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
  }
}
