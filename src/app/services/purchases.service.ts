import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  @Output() itemNum: EventEmitter<number> = new EventEmitter();

  constructor() { }

  public setItemNum(num: number) {
    this.itemNum.emit(num);
    console.log(this.itemNum);
  }

}
