import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserProfile } from 'src/app/models/userProfile.model';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: UserProfile[] = [];
  private user: UserProfile;
  public usersCount: number;
  public userSearch = "";

  constructor(private usersService: UsersService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((response) => {
      console.log(response);
      for (let index = 0; index < response.length; index++) {
        this.user = new UserProfile();
        this.user.id = response[index]?.id;
        this.user.email = response[index]?.email;
        this.user.userName = response[index]?.userName;
        this.user.type = response[index]?.type;
        this.user.isLocked = response[index]?.lockUser;
        this.users.push(this.user);
      }
      this.usersCount = this.users.length;
    }, (error) => {
      console.error(error.error);
    });
  }

  public viewUserDetails(user: NgbModalRef): void {
    this.modalService.showModal(user);
  }

  public lockUser(id: number): void {
    this.usersService.lockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]?.id === id) {
            this.users[index].isLocked = true;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public unlockUser(id: number): void {
    this.usersService.unlockUser(id).subscribe(
      response => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]?.id === id) {
            this.users[index].isLocked = false;
          }
        }
      }, error => {
        console.error(error.error);
      })
  }

  public deleteUser(id: number, index: number): void {
    if (confirm("This action is irreversible, are you sure you want to delete the customer?")) {
      this.usersService.deleteUser(id).subscribe(
        response => {
          this.users.splice(index, 1);
        }, error => {
          console.error(error.error);
        }
      )
    }
  }

}
