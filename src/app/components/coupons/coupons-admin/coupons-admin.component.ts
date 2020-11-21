import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-coupons-admin',
  templateUrl: './coupons-admin.component.html',
  styleUrls: ['./coupons-admin.component.css']
})
export class CouponsAdminComponent implements OnInit {

  public coupons: Coupon[] = [];
  public coupon: Coupon;
  public couponSearch:string = "";
  public couponsCount: number;
  public couponIndex: number;
  public couponState: string;
  public isCouponNew: boolean;
  public couponForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public isSubmitFailed: boolean = false;
  public formFailureReason: string;
  public isCompanyUser: boolean = false;

  constructor(private couponsService: CouponsService, private modalService: ModalService,
              private validationService: ValidationService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllCoupons();
    if (this.usersService.getUserRole() == 'COMPANY') {
      this.isCompanyUser = true;
    }
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.pattern(/[a-zA-Z0-9 .,/+]+/)
        ]
      ),
      description: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
          Validators.pattern(/[a-zA-Z0-9 .,/+]+/)
        ]
      ),
      price: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          this.validationService.greaterThanValidator
        ]
      ),
      category: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      quantity: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          this.validationService.greaterThanValidator
        ]
      ),
      startDate: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      expirationDate: new FormControl(
        '',
        [
          Validators.required
        ]
      )
    })
  }

  private removeValidators(formGroup: FormGroup): void {
    for (const key in formGroup.controls) {
      formGroup.get(key).clearValidators();
      formGroup.get(key).updateValueAndValidity();
    }
  }

  private getAllCoupons(): void {
    this.couponsService.getAllCoupons().subscribe(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
          this.coupon = new Coupon();
          this.coupon.id = response[index]?.id;
          this.coupon.title = response[index]?.title;
          this.coupon.description = response[index]?.description;
          this.coupon.category = response[index]?.category;
          this.coupon.price = response[index]?.price;
          this.coupon.quantity = response[index]?.quantity;
          this.coupon.startDate = response[index]?.startDate;
          this.coupon.expirationDate = response[index]?.expirationDate;
          this.coupons.push(this.coupon);
        }
        this.couponsCount = this.coupons.length;
      }, (error) => {
        console.error(error.error);
      }
    );
  }

  private createCoupon(): Coupon {
    const coupon = new Coupon();
    coupon.title = this.couponForm.get('title').value;
    coupon.description = this.couponForm.get('description').value;
    coupon.price = this.couponForm.get('price').value;
    coupon.category = this.couponForm.get('category').value;
    coupon.quantity = this.couponForm.get('quantity').value;
    coupon.startDate = this.couponForm.get('startDate').value;
    coupon.expirationDate = this.couponForm.get('expirationDate').value;

    return coupon;
  }

  public viewCuponDetails(couponRef: NgbModalRef): void {
    this.modalService.showModal(couponRef);
  }

  public openCouponForm(couponRef: NgbModalRef): void {
    this.isCouponNew = true;
    this.couponForm = this.createFormGroup();
    this.isFormSubmitted = false;
    this.isSubmitFailed = false;
    this.modalService.showModal(couponRef);
  }

  public clearForm(): void {
    this.removeValidators(this.couponForm);
    this.couponForm.reset();
    this.isSubmitFailed = false;
    this.couponForm = this.createFormGroup();
  }

  public saveNewCoupon(modalRef: NgbActiveModal): void {
    const coupon = this.createCoupon();
    this.couponsService.addCoupon(coupon).subscribe(
      (response) => {
        coupon.id = response;
        this.coupons.push(coupon);
        this.isFormSubmitted = true;
        this.couponsCount = this.coupons.length;
        this.couponState = 'created';
        modalRef.dismiss('save clicked');
      }, (error) => {
        console.error(error.error);
        this.isSubmitFailed = true;
        this.formFailureReason = error.error.errorDescription;
      }
    )
  }

  public saveExistingCoupon(couponIndex: number, modalRef: NgbActiveModal): void {

  }

  public updateCouponModal(coupon: Coupon, couponRef: NgbModalRef): void {}

  public deleteCoupon(couponId: number, index: number): void {}

}
