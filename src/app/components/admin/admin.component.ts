import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private title: Title) {
                this.title.setTitle('Admin');
              }

  ngOnInit(): void {
    console.log(this.route);
    this.router.navigate(['customers'], { relativeTo: this.route });
  }

}
