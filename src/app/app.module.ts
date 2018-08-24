import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ApiService } from './service/api.service';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { BooksComponent } from './component/books/books.component';
import { ViewBookComponent } from './component/view-book/view-book.component';
import { ViewUserComponent } from './component/view-user/view-user.component';
import { ViewTransactionComponent } from './component/view-transaction/view-transaction.component';
import { PaginatorComponent } from './component/template/paginator/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    NavBarComponent,
    DashboardComponent,
    UsersComponent,
    TransactionsComponent,
    BooksComponent,
    ViewBookComponent,
    ViewUserComponent,
    ViewTransactionComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
