import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs/operators';
import { Coupon } from 'src/app/models/coupon.model';
import { Purchase } from 'src/app/models/purchase.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { ModalService } from 'src/app/services/modal.service';
import { PurchasesService } from 'src/app/services/purchases.service';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  public purchases: Purchase[] = [];
  public purchase: Purchase;
  public purchaseSearch: string = "";
  public purchasesCount: number;
  public coupon: Coupon;

  constructor(private purchasesService: PurchasesService, private modalService: ModalService,
              private couponsService: CouponsService) { }

  ngOnInit(): void {
    this.getAllPurchases();
  }

  private getAllPurchases(): void {
    this.purchasesService.getAllPurchases().subscribe(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
          // TODO - this is not performance wize, need to improve --> use map
          this.couponsService.getCoupon(response[index]?.couponId).subscribe(
            (data) => {
              console.log(data);
              this.purchase = new Purchase();
              this.purchase.id = response[index]?.id;
              this.purchase.quantity = response[index]?.quantity;
              this.purchase.purchaseDate = response[index]?.purchaseDate;
              this.purchase.couponId = response[index]?.couponId;
              this.purchase.customer = response[index]?.customer;
              this.purchase.couponTitle = data?.title;
              this.purchase.couponPrice = data?.price;
              this.purchase.amount = this.purchase.couponPrice * this.purchase.quantity;
              this.purchases.push(this.purchase);
              this.purchasesCount = this.purchases.length;
            }, (error) => {
              console.error(error.error);
            }
          );
        }
        console.log(this.purchases);
      }, (error) => {
        console.error(error.error);
      }
    );
  }

  public viewPurchaseDetails(couponRef: NgbModalRef): void {
    this.modalService.showModal(couponRef);
  }

}
