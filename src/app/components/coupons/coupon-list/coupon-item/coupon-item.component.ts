import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Coupon } from 'src/app/models/coupon.model';
import { AlertsService } from 'src/app/services/alerts.service';
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
  @ViewChild('warning') warning: TemplateRef<NgbActiveModal>;
  public quantity: number = 1;

  constructor(private modalService: ModalService,
              private purchasesService: PurchasesService,
              private usersService: UsersService,
              private shoppingService: ShoppingService,
              private router: Router,
              private alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  public decrementQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  public incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  public showCoupon(couponModal: NgbModalRef): void {
    this.quantity = 1;
    this.modalService.showModal(couponModal);
  }

  public addCouponToCart(couponModal: NgbActiveModal): void {
    if (this.quantity > 0 && this.quantity <= 10) {
      couponModal.close();
      if (this.usersService.getLoginState()) {
        console.log('add to cart: ' + this.coupon.title);
        const cartItems = this.shoppingService.getCartItems();
        let itemsCountFlag = true;
        for (let index = 0; index < cartItems.length; index++) {
          if (this.coupon.id == cartItems[index].couponId) {
              itemsCountFlag = false;
          }
        }
        if (itemsCountFlag) {
          this.purchasesService.setItemNum(1);
        }
        this.coupon.quantity = this.coupon.quantity - this.quantity;
        this.shoppingService.addCartItem(this.coupon, this.quantity);
      } else {
        this.router.navigate(['/login']);
      }
    }
    else {
      this.alertsService.warn('Valid range is between 1 to 10', { autoClose: true, keepAfterRouteChange: false });
    }
  }

}
