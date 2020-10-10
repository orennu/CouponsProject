import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';


@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  coupons: Coupon[];

  constructor(private couponsService: CouponsService) { }

  ngOnInit(): void {
    this.coupons = this.couponsService.getCoupons();
  }

}
