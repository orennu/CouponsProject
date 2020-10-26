import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // public showCart(shoppingCart: NgbModalRef): void {
  //   this.modalService.open(shoppingCart, { centered: true }).result.then((result) => {
  //     this.closeResult = `closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     console.log('by pressing ESC');
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     console.log('by clicking on a backdrop');
  //     return 'by clicking on a backdrop';
  //   } else {
  //     console.log(`with: ${reason}`);
  //     return  `with: ${reason}`;
  //   }
  // }

}
