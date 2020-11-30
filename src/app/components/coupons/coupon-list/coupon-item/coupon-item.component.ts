import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Coupon } from 'src/app/models/coupon.model';
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
              private router: Router) { }

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
        this.coupon.quantity = this.coupon.quantity - this.quantity;
        this.shoppingService.addCartItem(this.coupon, this.quantity);
        this.purchasesService.setItemNum(1);
      } else {
        this.router.navigate(['/login']);
      }
    }
    else {
      this.showWarning();
    }
  }

  private showWarning(): void {
    this.modalService.showModal(this.warning, true, 'lg');
  }

}
