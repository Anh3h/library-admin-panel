import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { User } from '../../model/User';
import { Error } from '../../model/Error';
import { Book } from '../../model/Book';
import { Transaction } from '../../model/Transaction';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  private url;
  public progressBar = false;
  public error = new Error();
  public transaction = {} as Transaction;
  private id: string;

  constructor( private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.transaction.user = {} as User;
    this.transaction.book = {} as Book;
    this.progressBar = true;
    this.url = '/transactions/' + this.id;
    this.getBook();
  }

  private getBook() {
    this.apiService.get(this.url, TokenType.BEARER, (data) => {
      this.transaction = data;
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

  public redirect(url: string){
    this.progressBar = true;
    this.router.navigate([url, this.transaction.id]);
    this.progressBar = false;
  }


}
