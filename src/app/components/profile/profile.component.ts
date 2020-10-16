import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number;
  profile: UserProfile;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    const userIdObservable = this.usersService.getUserByUserName('orennu');
    userIdObservable.subscribe(() => {
      this.userId = this.usersService.getUserId();
      const profileObservable = this.usersService.getUserProfile(this.userId);
      profileObservable.subscribe(() => {
        this.usersService.getProfile()
        this.profile = this.usersService.userProfile;
      })
    })
  }

}
