import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private title: Title) {
                this.title.setTitle('Company');
              }

  ngOnInit(): void {
    this.router.navigate(['users'], { relativeTo: this.route });
  }

}
