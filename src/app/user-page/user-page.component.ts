import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  id: number;
  firstname: string;
  lastname: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params['firstname'];
    this.id = this.route.snapshot.params['lastname'];
    this.route.params.subscribe((params: Params) => {
     this.id = +params ['id'];
      this.firstname = params ['firstname'];
      this.lastname = params ['lastname'];
    });

  }
}
