import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../component/login/login.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { UsersComponent } from '../component/users/users.component';
import { ViewUserComponent } from '../component/view-user/view-user.component'
import { BooksComponent } from '../component/books/books.component';
import { ViewBookComponent } from '../component/view-book/view-book.component';
import { TransactionsComponent } from '../component/transactions/transactions.component';
import { ViewTransactionComponent } from '../component/view-transaction/view-transaction.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: ViewUserComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: ViewBookComponent },
  { path: 'book-requests', component: TransactionsComponent },
  { path: 'book-requests/:id', component: ViewTransactionComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
