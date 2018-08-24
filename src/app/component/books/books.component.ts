import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { Page } from '../../model/Page';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private url = '/books';
  public progressBar = false;
  public displayedColumns = ['title', 'author', 'availableQty', 'action'];
  public datasource = new MatTableDataSource();
  public page = new Page();
  public pageParams = { size: 5, page: 1  }

  constructor( private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    this.getBooks()
  }

  public onPrevious() {
    this.pageParams.page = (this.page.number);
    this.progressBar = true;
    this.getBooks();
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 2);
    this.progressBar = true;
    this.getBooks();
  }

  public goToPage(n: number) {
    this.pageParams.page = (n);
    this.progressBar = true;
    this.getBooks();
  }

  private getBooks() {
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

  private openSnackBar(message: string, ) {
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

  public deleteBook(bookId) {
    this.progressBar = true;
    if ( bookId == null || bookId == undefined || bookId == '') {
      this.progressBar = false;
      this.openSnackBar('ID cannot be empty');
    } else {
      if (!window.confirm("Are you sure you want to permanently delete this book? ")) {
        this.progressBar = false;
        return
      }
      let url = "/books/"+bookId;
      this.apiService.delete(url, TokenType.BEARER, (data) => {
        this.openSnackBar("Successfully deleted book")
        this.getBooks();
      }, (error) => {
        this.openSnackBar(error.message);
        this.progressBar = false;
      })
    }
  }

}
