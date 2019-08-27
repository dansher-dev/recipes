import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template:
    '<div class="lds-ellipsis col-xs-offset-6"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
