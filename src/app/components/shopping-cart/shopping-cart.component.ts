import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Purchase } from 'src/app/models/purchase.model';
import { ModalService } from 'src/app/services/modal.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[];
  couponIds: number[] = [];

  constructor(private shoppingService: ShoppingService, private datePipe: DatePipe,
              private purchasesService: PurchasesService, private usersService: UsersService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.cartItems = this.shoppingService.getCartItems();
    console.log(this.cartItems);
  }

  public getSumPrice(): number {
    let sum = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      sum = sum + (this.cartItems[index].quantity * this.cartItems[index].price);
    }

    return sum;
  }

  public cleanCart(): void {
    const numItem = this.shoppingService.getCartItemsCount();
    if (numItem > 0) {
      if (confirm('All items in cart will be removed, are you sure you want to continue?')) {
        this.purchasesService.setItemNum(-numItem);
        this.shoppingService.removeCoupons();
        this.cartItems = [];
        window.location.reload();
      }
    }
  }

  public checkoutCart(): void {
    let purchases: Purchase[] = [];
    for (let index = 0; index < this.cartItems.length; index++) {
      const purchase: Purchase = new Purchase();
      purchase.quantity = this.cartItems[index].quantity;
      purchase.purchaseDate = this.convertDateFormat();
      purchase.couponId = this.cartItems[index].couponId;
      purchase.customer = { id: this.usersService.getUserId() };
      delete purchase.amount;
      delete purchase.couponCategory;
      delete purchase.id;
      delete purchase.couponPrice;
      delete purchase.couponTitle;
      delete purchase.customerFullName;
      purchases.push(purchase);
    }
    console.log(purchases);
    this.purchasesService.addPurchases(purchases).subscribe(
      () => {
        const numItem = this.shoppingService.getCartItemsCount();
        this.purchasesService.setItemNum(-numItem);
        this.shoppingService.removeCoupons();
        this.cartItems = [];
        this.modalService.closeModals('checkout completed');
      }, (error) => {
        console.error(error.error);
      }
    );
  }

  private convertDateFormat(): string {
    let date = Date.now();
    const convertedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    return convertedDate;
  }
}
