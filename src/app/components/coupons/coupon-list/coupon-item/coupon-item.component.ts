import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent implements OnInit {

  @Input() coupon: Coupon;
  @Input() index: number;
  closeResult: string;

  constructor(private couponsService: CouponsService,
              private modalService: NgbModal,
              private purchasesService: PurchasesService,
              private usersService: UsersService,
              private shoppingService: ShoppingService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public showCoupon(couponModal: NgbModalRef): void {
    this.modalService.open(couponModal, { centered: true }).result.then((result) => {
      this.closeResult = `closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public addCouponToCart(couponModal: NgbActiveModal): void {
    couponModal.close();
    if (this.usersService.getLoginState()) {
      console.log('add to cart: ' + this.coupon.title);
      this.shoppingService.addCoupon(this.coupon);
      this.purchasesService.setItemNum(1);
    } else {
      this.router.navigate(['/login']);
    }
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

}
