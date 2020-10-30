import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  public isAdmin: boolean;
  public isCompany: boolean;
  private routesToLogout = ['/profile'];
  public num: number = +localStorage.getItem('itemsInCart');
  private closeResult: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private usersService: UsersService,
              private purchasesService: PurchasesService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.usersService.loginState.subscribe((state: boolean) => this.setState(state));
    this.purchasesService.itemNum.subscribe((num: number) => this.setNum(num));
    this.usersService.userRole.subscribe((role: string) => this.setUserRole(role));
    if (this.usersService.getLoginState()) {
      this.isLoggedIn = true;
    }
    if (this.usersService.getUserRole() === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  public getUrl(): string {
    return this.router.url;
  }

  private setState(state: boolean): void {
    this.isLoggedIn = state;
  }

  private setNum(num: number): void {
    this.num = this.num + num;
    localStorage.setItem('itemsInCart', this.num+'');
  }

  public onLogout(): void {
    this.usersService.logout();
    if (this.routesToLogout.indexOf(this.router.url) !== -1) {
      this.router.navigate(['home']);
    }
    this.router.navigate(['/home']);
  }

  public showCart(shoppingCart: NgbModalRef): void {
    this.modalService.open(shoppingCart, { centered: false }).result.then((result) => {
      this.closeResult = `closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('by pressing ESC');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('by clicking on a backdrop');
      return 'by clicking on a backdrop';
    } else {
      console.log(`with: ${reason}`);
      return  `with: ${reason}`;
    }
  }

  private setUserRole(role: string): void {
    if (role.valueOf() === 'ADMIN') {
      this.isAdmin = true;
    }
    if (role == 'COMPANY') {
      this.isCompany = true;
    }
    if (role === '') {
      this.isAdmin = false;
      this.isCompany = false;
    }
  }

}
