import {Component} from '@angular/core';
import {PaginationService} from './pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  providers: [PaginationService]
})
 export class PaginationComponent {
constructor() {}
}
