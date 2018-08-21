import { Component, OnInit } from '@angular/core';
import { Validator, FormControl, Validators } from '@angular/forms';
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

  public email = new FormControl('', [Validators.email]);
  public credential = {} as Credential;
  public password: string;
  public invalidEmail: string
  private token: Token;
  public progressBar = false;
  public error: Error = new Error();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.progressBar = true;
    console.log("Initializing Login component");
    localStorage.removeItem('token');
    this.progressBar = false;
  }

  private validateEmail() {
    if (this.email.hasError('email')) {
      this.invalidEmail = "Not a valid email";
      return false;
    }
    this.invalidEmail = '';
    return true;
  }

  public authenticate(){
    this.progressBar = true;
    if( this.credential.email && this.credential.password ) {

      this.error.message = ""
      this.error.status = false;
      if (this.validateEmail()) {

        let url = `/oauth/token?grant_type=password&username=${this.credential.email}&password=${this.credential.password}`;
        this.apiService.post(url, {}, TokenType.BASIC, (response) => {
          this.updateStorage(response);
        },  (error) => {
          this.error.message = "Invalid email or password";
          this.error.status = true
        })
      }
      this.progressBar = false;
      return;
    }
    this.error.message = "Fill or required fields"
    this.error.status = true;
    this.progressBar = false;
  }

  private updateStorage(response):void  {
    localStorage.removeItem('token');
    let token = Token.createInstance(response.access_token, response.refresh_token, <number> (new Date().getTime() / 1000));
    localStorage.setItem('token', JSON.stringify(token));
    this.setUser();
  }

  private setUser():void {
    let url = `/users/email/${this.credential.email}`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      console.log(response);
      this.setNotification(response.id);
      localStorage.setItem('userId', response.id);
    }, (error) => {
      console.log(error);
    })
  }

  private setNotification(userId):void {
    let url = `/users/${userId}/notifications?done=false`;
    this.apiService.get(url, TokenType.BEARER, (response) => {
      localStorage.setItem('notifications', response.totalElements);
      location.replace("/dashboard");
    }, (error) => {
      console.log(error);
    })
  }

}


interface Credential {
  email: String;
  password: String
}