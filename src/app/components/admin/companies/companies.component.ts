import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  private company: Company;
  public companiesCount: number;
  public companySearch = "";
  companyForm: FormGroup;

  constructor(private companiesService: CompaniesService, private modalService: ModalService) {
    this.companyForm = this.createFormGroup();
  }

  ngOnInit(): void {
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

  public viewCompanyDetails(company: NgbModalRef): void {
    this.modalService.showModal(company);
  }

  public openCompanyForm(company: NgbModalRef): void {
    this.modalService.showModal(company);
  }

  public clearForm(): void {
    this.removeValidators(this.companyForm);
    this.companyForm.reset();
    this.companyForm = this.createFormGroup();
  }

  public addCompany(company: Company): void {
    this.companiesService.addCompany(company).subscribe(
      (response) => {
        company.id = response.id;
        this.companies.push(company);
      }, (error) => {
        console.error(error.error);
      });
  }

  public updateCompany(company: Company): void {
    this.companiesService.updateCompany(company).subscribe(
      (response) => {
        for (let index = 0; index < this.companies.length; index++) {
          if (this.companies[index].id === company.id) {
            this.companies[index] = company;
          }
        }
      }, (error) => {
        console.error(error.error);
      }
    )
  }

  public deleteCompany(companyId: number, index: number): void {
    if (confirm("This action is irreversible, are you sure you want to delete the company?")) {
      this.companiesService.deleteCompany(companyId).subscribe(
        response => {
          this.companies.splice(index, 1);
        }, error => {
          console.error(error.error);
        }
      )
    }
  }

  public onFormSubmit() {

  }

}
