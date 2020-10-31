import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { ModalService } from 'src/app/services/modal.service';
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

  constructor(private couponsService: CouponsService,
              private modalService: ModalService,
              private purchasesService: PurchasesService,
              private usersService: UsersService,
              private shoppingService: ShoppingService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public showCoupon(couponModal: NgbModalRef): void {
    this.modalService.showModal(couponModal);
  }

  public addCouponToCart(couponModal: NgbActiveModal): void {
    couponModal.close();
    if (this.usersService.getLoginState()) {
      console.log('add to cart: ' + this.coupon.title);
      this.shoppingService.addCartItem(this.coupon);
      this.purchasesService.setItemNum(1);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
