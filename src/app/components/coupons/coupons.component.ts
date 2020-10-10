import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';


@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
  providers: [CouponsService]
})
export class CouponsComponent implements OnInit {

  constructor(private couponsService: CouponsService) { }

  ngOnInit(): void {
  }

}
