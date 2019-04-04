import {Component} from '@angular/core';



@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-layer spinner-red">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>`
})
export class SpinnerComponent {
  constructor() {
  }
}
