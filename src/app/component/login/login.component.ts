import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Token } from '../../model/Token';
import { Error } from '../../model/Error';
import { TokenType } from '../../service/api.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public isAuthenticatic: boolean = true;
  public sentRequest: boolean = false;
  private token: Token;
  public progressBar = false;
  public error: Error;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    console.log("initializing Login component");
    localStorage.removeItem('token');
    this.progressBar = false;
  }

  authenticate(){
    this.progressBar = true;
    if( this.email && this.password ) {
      this.sentRequest = true;
      console.log('Authenticating user...')
      /* var authUrl = `/oauth/token?grant_type=password&username=${this.email}&password=`+this.password;
      this.apiService.post(authUrl, {}, TokenType.BASIC, this.successfullyAuthUser, (error) => {
        this.isAuthenticatic = false;
        this.error = error.message;
        this.progressBar = false;
      }); */
    }
  }

  private successfullyAuthUser( data ) {
    localStorage.removeItem('token');
    var token = Token.createInstance(data.access_token, data.refresh_token, <number> (new Date().getTime() / 1000) ,data.expires_in);
    localStorage.setItem('token', JSON.stringify(token));
    this.router.navigate(['/dashboard']);
  }

}
