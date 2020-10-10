import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DropdownDirective } from './directives/dropdown.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LeadersComponent } from './components/leaders/leaders.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { CouponsComponent } from './components/coupons/coupons.component';
import { AppConfig, APP_CONFIG } from './app.config';
import { CouponListComponent } from './components/coupons/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupons/coupon-list/coupon-item/coupon-item.component';


@NgModule({
  declarations: [
    DropdownDirective,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    PageNotFoundComponent,
    LeadersComponent,
    ContactFormComponent,
    RegisterComponent,
    CouponsComponent,
    CouponListComponent,
    CouponItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: APP_CONFIG, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
