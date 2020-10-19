import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

imports: [
  HttpClientModule
]

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public email: string;
  private api = 'https://api.slapform.com/';

  constructor(private http: HttpClient) {
  }
  
  postForm(input: string) {
    console.log(this.email);
    return this.http.post(this.api + this.email, input, {responseType: 'text'}).pipe(
      map((response) => {
        if (response) {
          return response;
        }
      }, (error: any) => {
        return error;
      })
    )
  }

}
