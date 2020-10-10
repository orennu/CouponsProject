import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: string;

  constructor(private couponsService: CouponsService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public showCoupon(coupon: Coupon) {
    console.log(this.coupon);
    this.modalService.open(coupon, { centered: true }).result.then((result) => {
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

}
