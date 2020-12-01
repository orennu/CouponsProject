import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router,
              private title: Title) {
    this.title.setTitle('home');
  }

  public ngOnInit(): void {
    const userRole = this.usersService.getUserRole();
    console.log(userRole);
    if (userRole == 'ADMIN') {
      this.router.navigate(['admin']);
    }
    if (userRole == 'COMPANY') {
      this.router.navigate(['company']);
    }
  }

}
