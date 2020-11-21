import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CouponsAdminComponent } from './components/coupons/coupons-admin/coupons-admin.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { UsersComponent } from './components/users/users.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';

import { LeadersComponent } from './components/leaders/leaders.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordEditComponent } from './components/reset-password/reset-password-edit/reset-password-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CompanyComponent } from './components/company/company.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'leaders', component: LeadersComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password/:code', component: ResetPasswordEditComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'admin', component: AdminComponent, children: [
      { path: 'customers',component: CustomersComponent },
      { path: 'users',component: UsersComponent },
      { path: 'companies',component: CompaniesComponent },
      { path: 'coupons',component: CouponsAdminComponent },
      { path: 'purchases',component: PurchasesComponent }
    ] },
    { path: 'company', component: CompanyComponent, children: [
      { path: 'users',component: UsersComponent },
    ] },
    { path: 'customer', redirectTo: '/home' },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: 'forbidden', component:  ForbiddenPageComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
