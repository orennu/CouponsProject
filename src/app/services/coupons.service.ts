import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';


@Injectable({
    providedIn: 'root'
})
export class CouponsService {

    constructor(private appRoutingModule: AppRoutingModule, private http: HttpClient) {}
    
}