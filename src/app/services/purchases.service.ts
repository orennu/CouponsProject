import { EventEmitter, Injectable, Output } from '@angular/core';
import { Purchase } from '../models/purchase.model';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  @Output() itemNum: EventEmitter<number> = new EventEmitter();
  purchases: Purchase[] = [];

  constructor() { }

  public setItemNum(num: number): void {
    this.itemNum.emit(num);
  }

  public getItemNum(): number {
    return +(localStorage.getItem('itemsInCart'));
  }

}
