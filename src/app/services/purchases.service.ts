import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Purchase } from '../models/purchase.model';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private endpoint: string = 'purchases/';
  @Output() itemNum: EventEmitter<number> = new EventEmitter();
  purchases: Purchase[] = [];

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  public setItemNum(num: number): void {
    this.itemNum.emit(num);
  }

  public getItemNum(): number {
    return +(localStorage.getItem('itemsInCart'));
  }

  public getPurchase(purchaseId: number): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint + purchaseId, { responseType: 'json' });
  }

  public getAllPurchases(): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint, { responseType: 'json' });
  }

  public getPurchasesByCompany(companyId: number): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint + 'search', { params: { companyId: companyId+'' },
                                                                                        responseType: 'json' });
  }

  public addPurchases(purchases: Purchase[]): Observable<any> {
    return this.http.post(this.config.apiBaseEndpoint + this.endpoint, purchases, { responseType: 'json' });
  }

}
