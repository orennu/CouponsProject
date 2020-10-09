import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public collapsed: boolean = true;
  public isLoggedIn: boolean;

  constructor(private router: Router, private usersService: UsersService) {
    this.usersService.setLoginState.subscribe((state: boolean) => this.setState(state));
  }
  
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  getUrl() {
    return this.router.url;
  }

  setState(state: boolean) {
    this.isLoggedIn = state;
  }

  onLogout() {
    this.usersService.logout()
  }

}
