import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { Page } from '../../model/Page';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private url = '/users';
  public progressBar = false;
  public displayedColumns = ['name', 'username', 'telephone', 'role', 'action'];
  public datasource = new MatTableDataSource();
  public page = new Page();
  public pageParams = { size: 5, page: 1  }

  constructor( private apiService: ApiService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    this.getUsers()
  }

  public onPrevious() {
    this.pageParams.page = (this.page.number);
    this.progressBar = true;
    this.getUsers();
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 2);
    this.progressBar = true;
    this.getUsers();
  }

  public goToPage(n: number) {
    this.pageParams.page = (n);
    this.progressBar = true;
    this.getUsers();
  }

  private getUsers() {
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

  public deleteUser(userId) {
    this.progressBar = true;
    if ( userId == null || userId == undefined || userId == '') {
      this.progressBar = false;
      this.openSnackBar('ID cannot be empty');
    } else {
      if (!window.confirm("Are you sure you want to permanently delete this user? ")) {
        this.progressBar = false;
        return
      }
      let url = `/users/${userId}`;
      this.apiService.delete(url, TokenType.BEARER, (data) => {
        this.openSnackBar("Successfully deleted user")
        this.getUsers();
      }, (error) => {
        this.openSnackBar(error.message);
        this.progressBar = false;
      })
    }
  }

}
