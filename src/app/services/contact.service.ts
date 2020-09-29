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

  private api = 'https://api.slapform.com/orennu.cloud@gmail.com'

  constructor(private http: HttpClient) { }

  postForm(input: any) {
    return this.http.post(this.api, input, {responseType: 'text'}).pipe(
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
