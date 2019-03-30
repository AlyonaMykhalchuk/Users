import {Component} from '@angular/core';
import {template} from '@angular/core/src/render3';

@Component ({
  selector : 'app-loader',
  template : `<div class="lds-ripple"><div></div><div></div></div>`,
  styleUrls : ['./loader.component.css']
})
export class LoaderComponent {
}
