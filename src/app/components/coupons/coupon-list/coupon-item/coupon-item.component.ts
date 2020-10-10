import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';


@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent implements OnInit {

  @Input() coupon: Coupon;
  @Input() index: number;
  selectedCoupon: Coupon;
  isShowAllCoupons: boolean;

  constructor(private couponsService: CouponsService) {

  }

  ngOnInit(): void {
  }

  public showCoupon(coupon: Coupon) {
    console.log(coupon);
    this.selectedCoupon = coupon;
  }

  public showCoupons() {
    this.isShowAllCoupons = true;
  }

}
