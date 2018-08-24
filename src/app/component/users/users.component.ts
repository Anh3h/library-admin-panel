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
    this.pageParams.page = (this.page.number - 1);
    this.getUsers();
  }

  public onNext() {
    this.pageParams.page = (this.page.number + 1);
    this.getUsers();
  }

  public goToPage(n: number) {
    this.pageParams.page = (n-1);
    this.getUsers();
  }

  getUsers() {
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

  openSnackBar(message: string, ) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

  redirect(url: string, parameter?: string){
    this.progressBar = true;
    if (parameter) {
      this.router.navigate([url, parameter]);
      this.progressBar = false;
    } else {
      this.router.navigate([url]);
      this.progressBar = false;
    }
  }

  deleteUser(user_uuid) {
    this.progressBar = true;
    if ( user_uuid == null || user_uuid == undefined || user_uuid == '') {
      this.progressBar = false;
      this.openSnackBar('UUID cannot be empty');
    } else {
      if (!window.confirm("Möchten Sie diesen Benutzer wirklich dauerhaft löschen? ")) {
        this.progressBar = false;
        return
      }
      let url = "/users/"+user_uuid;
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
