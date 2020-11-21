import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Purchase } from 'src/app/models/purchase.model';
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

  constructor(private purchasesService: PurchasesService, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  public viewPurchaseDetails(couponRef: NgbModalRef): void {
    this.modalService.showModal(couponRef);
  }

}
