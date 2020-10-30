import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllCustomers().subscribe((response) => {
      console.log(response);
      for (let index = 0; index < response.length; index++) {
        this.customer = new UserProfile();
        this.customer.id = response[index]?.id;
        this.customer.email = response[index]?.user.email;
        this.customer.firstName = response[index]?.firstName;
        this.customer.lastName = response[index]?.lastName;
        this.customer.phoneNumber = response[index]?.phoneNumber;
        this.customer.dateOfBirth = response[index]?.dateOfBirth;
        this.customer.isLocked = response[index]?.user.lockUser;
        this.customers.push(this.customer);
      }
    }, (error) => {
      console.error(error.error);
    });
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
