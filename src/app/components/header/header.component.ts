import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchasesService } from 'src/app/services/purchases.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public collapsed: boolean = true;
  public isLoggedIn: boolean;
  private routesToLogout = ['/profile'];
  public num: number = +localStorage.getItem('itemsInCart');

  constructor(private router: Router, private route: ActivatedRoute,
              private usersService: UsersService,
              private purchasesService: PurchasesService) {
    this.usersService.setLoginState.subscribe((state: boolean) => this.setState(state));
    this.purchasesService.itemNum.subscribe((num: number) => this.setNum(num));
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

  setNum(num: number) {
    this.num = this.num + num;
    localStorage.setItem('itemsInCart', this.num+"");
  }

  onLogout() {
    this.usersService.logout();
    if (this.routesToLogout.indexOf(this.router.url) !== -1) {
      this.router.navigate(['home'], { relativeTo: this.route });
    }
  }

}
