import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ApiService, TokenType } from '../../service/api.service';
import { Page } from '../../model/Page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public progressBar = false;
  public displayedColumns = [ 'user', 'book', 'checkoutStatus', 'checkout', 'checkin'];
  public transactions = new MatTableDataSource();
  public page = {} as Page;
  public pageParams = { size: 5, page: 1 }

  constructor(
    private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    console.log("Initializing Dashboard component");
    this.verifyAuth();
    this.getTransactions();
    this.progressBar = false;
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

  private getTransactions():void {
    let url = `/transactions?size=${this.pageParams.size}&page=${this.pageParams.page}`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      this.page.first = response.first ;
      this.page.last = response.last;
      this.page.number = response.number;
      this.page.numberOfElements = response.numberOfElements;
      this.page.size = response.size;
      this.page.sort = response.sort;
      this.page.totalElements = response.totalElements;
      this.page.number = response.number;
      this.page.totalPages = response.totalPages;

      this.transactions = response.content;
      console.log(this.transactions)
    }, (error) => {
      console.log(error);
    })
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
