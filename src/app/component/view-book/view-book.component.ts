import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { Book } from '../../model/Book';
import { Error } from '../../model/Error';
import { Topic } from '../../model/Topic';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private url;
  public progressBar = false;
  public error = new Error();
  public book = {} as Book;
  private id: string;

  constructor( private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.book.topic = {} as Topic;
    this.progressBar = true;
    this.url = '/books/' + this.id;
    this.getBook();
  }

  private getBook() {
    this.apiService.get(this.url, TokenType.BEARER, (data) => {
      this.book = data;
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
    this.router.navigate([url, this.book.id]);
    this.progressBar = false;
  }

}
