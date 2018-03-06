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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    NavBarComponent,
    DashboardComponent
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
