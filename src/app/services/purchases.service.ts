import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  @Output() itemNum: EventEmitter<number> = new EventEmitter();

  constructor() { }

  public setItemNum(num: number): void {
    this.itemNum.emit(num);
  }

  public getItemNum(): number {
    return +(localStorage.getItem('itemsInCart'));
  }

}
