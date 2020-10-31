import { Injectable } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private closeResult: string;

  constructor(private modalService: NgbModal) { }

  public showModal(modal: NgbModalRef): void {
    this.modalService.open(modal, { centered: false }).result.then((result) => {
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
