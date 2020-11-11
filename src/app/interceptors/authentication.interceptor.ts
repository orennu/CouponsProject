import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private usersService: UsersService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.router.url);
    console.log(request.url);
    let token: string;
    token = this.usersService.getUserToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(request);
    }
    if (this.router.url.endsWith('home')) {
      return next.handle(request);
    }
    if (this.router.url.endsWith('register')) {
      return next.handle(request);
    }
    if (this.router.url.endsWith('login')) {
      return next.handle(request);
    }
    if (this.router.url.includes('reset-password')) {
      return next.handle(request);
    }
    else {
      console.log('forbidden');
      this.router.navigate(['forbidden']);
    }


  }
}
