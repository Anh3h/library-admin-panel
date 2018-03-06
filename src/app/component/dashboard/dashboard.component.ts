import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public progressBar = false;
  public displayedColumns = [ 'name', 'isbn', 'reservationDate', 'checkout', 'checkin', 'action'];
  public transactions = new MatTableDataSource();

  constructor(
    private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    console.log("Initializing Dashboard component");
    //this.verifyAuth();
    //this.getLoggedUser();

    //Test code
    this.progressBar = false;
  }

  public getLoggedUser() {
    this.apiService.get('/me', TokenType.BEARER, (data) => {
      var user = data;
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    }, (error) => {});
  }

  public redirect(url: string, parameter?: string){
    this.progressBar = true;
    if (parameter) {
      this.router.navigate([url, parameter]);
      this.progressBar = false;
    } else {
      this.router.navigate([url]);
      this.progressBar = false;
    }
  }

  private verifyAuth() {
    if( localStorage.getItem('token') == null || localStorage.getItem('token') == undefined ||
      localStorage.getItem('token') == '' ) {
        this.router.navigate(['/login']);
        this.progressBar = false;
    }
    this.progressBar = false;
  }

  public openSnackBar(message: string, ) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

}
