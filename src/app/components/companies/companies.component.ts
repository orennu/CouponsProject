import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Company } from 'src/app/models/company.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  public companies: Company[] = [];
  public company: Company;
  public companyIndex: number;
  public companiesCount: number;
  public companySearch: string = "";
  public companyForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public isSubmitFailed: boolean = false;
  public formFailureReason: string;
  public isCompanyNew: boolean;
  public companyState: string;

  constructor(private companiesService: CompaniesService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+[ \'\-]?[a-zA-Z0-9]+$/)
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      phoneNumber: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^\\+?(?:[0-9] ?){6,14}[0-9]$'),
          Validators.minLength(6),
          Validators.maxLength(14)
        ]
      ),
      address: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern(/^[a-zA-Z0-9\s\.,'-]*$/)
        ]
      ),
      industry: new FormControl(
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

  private createCompany(): Company {
    const company = new Company();
    company.name = this.companyForm.get('name').value;
    company.email = this.companyForm.get('email').value;
    company.phoneNumber = this.companyForm.get('phoneNumber').value;
    company.address = this.companyForm.get('address').value;
    company.industry = this.companyForm.get('industry').value;

    return company;
  }

  private getAllCompanies(): void {
    this.companiesService.getAllCompanies().subscribe(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
          this.company = new Company();
          this.company.id = response[index]?.id;
          this.company.name = response[index]?.name;
          this.company.email = response[index]?.email;
          this.company.phoneNumber = response[index]?.phoneNumber;
          this.company.address = response[index]?.address;
          this.company.industry = response[index]?.industry;
          this.companies.push(this.company);
        }
        this.companiesCount = this.companies.length;
      }, (error) => {
        console.error(error.error);
      }
    );
  }

  public viewCompanyDetails(company: NgbModalRef): void {
    this.modalService.showModal(company);
  }

  public openCompanyForm(companyRef: NgbModalRef): void {
    this.isCompanyNew = true;
    this.companyForm = this.createFormGroup();
    this.isFormSubmitted = false;
    this.isSubmitFailed = false;
    this.modalService.showModal(companyRef);
  }

  public clearForm(): void {
    this.removeValidators(this.companyForm);
    this.companyForm.reset();
    this.isSubmitFailed = false;
    this.companyForm = this.createFormGroup();
  }

  public saveNewCompany(modalRef: NgbActiveModal): void {
    const company = this.createCompany();
    this.companiesService.addCompany(company).subscribe(
      (response) => {
        company.id = response;
        this.companies.push(company);
        this.isFormSubmitted = true;
        this.companiesCount = this.companies.length;
        this.companyState = 'created';
        modalRef.dismiss('save clicked');
      }, (error) => {
        console.error(error.error);
        this.isSubmitFailed = true;
        this.formFailureReason = error.error.errorDescription;
      });
  }

  public saveExistingCompany(companyIndex: number, modalRef: NgbActiveModal): void {
    const company = new Company();
    company.id = this.companies[companyIndex].id;
    company.name = this.companyForm.get('name').value;
    company.email = this.companyForm.get('email').value;
    company.phoneNumber = this.companyForm.get('phoneNumber').value;
    company.address = this.companyForm.get('address').value;
    company.industry = this.companyForm.get('industry').value;
    this.updateCompany(company, companyIndex, modalRef);
  }

  public updateCompanyModal(company: Company, companyRef: NgbModalRef): void {
    this.isFormSubmitted = false;
    this.companyIndex = this.companies.indexOf(company);
    this.isCompanyNew = false;
    this.companyForm = this.createFormGroup();
    this.companyForm.setValue({ 'name': company.name, 'email': company.email,
                                'phoneNumber': company.phoneNumber, 'address': company.address,
                                'industry': company.industry });
    this.modalService.showModal(companyRef);
  }

  private updateCompany(company: Company, companyIndex: number, modalRef: NgbActiveModal): void {
    this.companiesService.updateCompany(company).subscribe(
      (response) => {
        this.companies[companyIndex] = company;
        this.isFormSubmitted = true;
        this.companyState = 'updated';
        modalRef.dismiss('save clicked');
      }, (error) => {
        console.error(error.error);
        this.isSubmitFailed = true;
        this.formFailureReason = error.error.errorDescription;
      }
    )
  }

  public deleteCompany(companyId: number, index: number): void {
    if (confirm("This action is irreversible, are you sure you want to delete the company?")) {
      this.companiesService.deleteCompany(companyId).subscribe(
        response => {
          this.companies.splice(index, 1);
          this.companiesCount = this.companies.length;
        }, error => {
          console.error(error.error);
        }
      )
    }
  }

}
