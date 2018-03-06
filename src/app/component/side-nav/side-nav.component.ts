import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  route = location.pathname.split('/')[1];

  constructor() { }

  ngOnInit() {
    //this.verifyAuth();
  }

  private verifyAuth() {
    if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined ||
      localStorage.getItem('token') == '' ) {
        location.replace('/login')
    }
  }

}
