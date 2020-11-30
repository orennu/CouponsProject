import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';

import { SearchPipe } from './pipes/search.pipe';

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
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEditComponent } from './components/reset-password/reset-password-edit/reset-password-edit.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { UsersComponent } from './components/users/users.component';
import { CouponsAdminComponent } from './components/coupons/coupons-admin/coupons-admin.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { CompanyComponent } from './components/company/company.component';
import { AlertModule } from './modules/alert.module';


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
    CouponItemComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ResetPasswordEditComponent,
    ShoppingCartComponent,
    AdminComponent,
    CustomersComponent,
    CompaniesComponent,
    PurchasesComponent,
    UsersComponent,
    CouponsAdminComponent,
    SearchPipe,
    ForbiddenPageComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AlertModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: APP_CONFIG, useValue: AppConfig },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
