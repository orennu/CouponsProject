import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';


@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  public coupons: Coupon[] = [];
  public coupon: Coupon;

  constructor(private couponsService: CouponsService) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  private getAllCoupons(): void {
    this.couponsService.getAllCoupons().subscribe(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
          if (response[index]?.quantity > 0) {
            this.coupon = new Coupon();
            this.coupon.id = response[index]?.id;
            this.coupon.title = response[index]?.title;
            this.coupon.description = response[index]?.description;
            this.coupon.category = response[index]?.category;
            this.coupon.price = response[index]?.price;
            this.coupon.quantity = response[index]?.quantity;
            this.coupon.startDate = response[index]?.startDate;
            this.coupon.expirationDate = response[index]?.expirationDate;
            this.coupon.company = response[index]?.company;
            this.coupon.imageUrl = this.coupon.imageUrl + response[index]?.imageUuid;
            this.coupons.push(this.coupon);
          }
        }
      }, (error) => {
        console.error(error.error);
      }
    );
  }

}
