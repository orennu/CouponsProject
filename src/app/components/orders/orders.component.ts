import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/models/purchase.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { ModalService } from 'src/app/services/modal.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Purchase[] = [];
  public order: Purchase;
  public orderSearch: string = "";
  public ordersCount: number;

  constructor(private purchasesService: PurchasesService, private modalService: ModalService,
              private couponsService: CouponsService, private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    const userRole = this.usersService.getUserRole();
    if (userRole == 'CUSTOMER') {
      this.getCustomerPurchases();
    }
    else {
      this.router.navigate(['/forbidden'])
    }
  }

  private getCustomerPurchases(): void {
    const userId = this.usersService.getUserId();
    this.purchasesService.getPurchasesByCustomer(userId).subscribe(
      (response) => {
        for (let index = 0; index < response.length; index++) {
          this.order = new Purchase();
          this.order.quantity = response[index]?.purchaseQuantity;
          this.order.purchaseDate = response[index]?.purchaseDate;
          this.order.couponTitle = response[index]?.couponTitle;
          this.order.couponPrice = response[index]?.couponPrice;
          this.order.couponCategory = response[index]?.couponCategory;
          this.order.amount = this.order.couponPrice * this.order.quantity;
          this.orders.push(this.order);
        }
        this.ordersCount = this.orders.length;
      }, (error) => {
        console.error(error.error);
      }
    );
  }

  public viewOrderDetails(foo) {}

}
