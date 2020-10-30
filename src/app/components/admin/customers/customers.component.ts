import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customers: UserProfile[] = [];
  private customer: UserProfile;
  private closeResult: string;

  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usersService.getAllCustomers().subscribe((response) => {
      console.log(response);
      for (let index = 0; index < response.length; index++) {
        this.customer = new UserProfile();
        this.customer.id = response[index]?.id;
        this.customer.email = response[index]?.user.email;
        this.customer.userName = response[index]?.user.userName;
        this.customer.firstName = response[index]?.firstName;
        this.customer.lastName = response[index]?.lastName;
        this.customer.phoneNumber = response[index]?.phoneNumber;
        this.customer.address = response[index]?.address;
        this.customer.dateOfBirth = response[index]?.dateOfBirth;
        this.customer.isLocked = response[index]?.user.lockUser;
        this.customers.push(this.customer);
      }
    }, (error) => {
      console.error(error.error);
    });
  }

  public viewCustomerDetails(customer: NgbModalRef): void {
    this.modalService.open(customer, { centered: false }).result.then((result) => {
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

  public lockUser(id: number): void {
    this.usersService.lockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.customers.length; index++) {
          if (this.customers[index]?.id === id) {
            this.customers[index].isLocked = true;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public unlockUser(id: number): void {
    this.usersService.unlockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.customers.length; index++) {
          if (this.customers[index]?.id === id) {
            this.customers[index].isLocked = false;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public deleteCustomer(id: number, index: number): void {
    if (confirm("This action is irreversible, are you sure you want to delete the customer?")) {
      this.usersService.deleteCustomer(id).subscribe(
        response => {
          this.customers.splice(index, 1);
        }, error => {
          console.error(error.error);
        }
      )
    }
  }

}
