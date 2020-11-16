import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  public userRole: string;

  constructor(private usersService: UsersService, private router: Router) { }

  public ngOnInit(): void {
    this.userRole = this.usersService.getUserRole();
  }

  public goHome(): void {
    if (this.userRole === 'CUSTOMER' || this.userRole === null) {
      this.router.navigate(['/']);
    }
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin']);
    }
    if (this.userRole === 'COMPANY') {
      this.router.navigate(['/company']);
    }
  }

}
