import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { Page } from '../../model/Page';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  private url = '/transactions';
  public progressBar = false;
  public displayedColumns = [ 'user', 'book', 'checkout', 'checkin', 'action'];
  public datasource = new MatTableDataSource();
  public page = new Page();
  public pageParams = { size: 5, page: 1  }

  constructor( private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    this.getTransactions()
  }

  public onPrevious() {
    this.pageParams.page = (this.page.number);
    this.progressBar = true;
    this.getTransactions();
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 2);
    this.progressBar = true;
    this.getTransactions();
  }

  public goToPage(n: number) {
    this.pageParams.page = (n);
    this.progressBar = true;
    this.getTransactions();
  }

  private getTransactions() {
    this.apiService.get(this.url + `?size=${this.pageParams.size}&page=${this.pageParams.page}`, TokenType.BEARER, (data) => {
      this.page.first = data.first ;
      this.page.last = data.last;
      this.page.number = data.number;
      this.page.numberOfElements = data.numberOfElements;
      this.page.size = data.size;
      this.page.sort = data.sort;
      this.page.totalElements = data.totalElements;
      this.page.number = data.number;
      this.page.totalPages = data.totalPages;

      this.datasource.data = data.content;
      this.progressBar = false;
    }, (error) => {
      this.progressBar = false;
      this.openSnackBar(error.message);
    });
  }

  public openSnackBar(message: string, ) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
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

}
