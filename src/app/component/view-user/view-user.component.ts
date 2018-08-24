import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { TokenType } from '../../service/api.service';
import { User } from '../../model/User';
import { Error } from '../../model/Error';
import { Role } from '../../model/Role';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  private url;
  public isProfile = false;
  public progressBar = false;
  public error = new Error();
  public user = {} as User;
  private id: string;

  constructor( private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user.role = {} as Role;
    if ( this.id == 'profile' ){
      this.progressBar = true;
      this.isProfile = true;
      this.url = '/users/' + localStorage.getItem('userId');
      this.getUser();
      return;
    }
    this.progressBar = true;
    this.url = '/users/' + this.id;
    this.getUser();
  }

  getUser() {
    this.apiService.get(this.url, TokenType.BEARER, (data) => {
      this.user = data;
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

  redirect(url: string){
    this.progressBar = true;
    if ( this.id == 'profile' ) {
      this.router.navigate(['profile/updateProfile']);
    } else {
      this.router.navigate([url, this.user.id]);
    }
    this.progressBar = false;
  }

  updatePassword() {
    this.router.navigate(['profile/updatePassword']);
  }

  back() {
    this.location.back();
  }

}
