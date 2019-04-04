import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users, searchStr: string) {
    if ( users.length === 0 || searchStr === '') {
      return users;
    } else {
    return users.filter(user => user.firstname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1); }
  }
}
