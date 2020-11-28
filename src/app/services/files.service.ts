import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private endpoint: string = 'files/';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) { }

  public uploadFile(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.config.apiBaseEndpoint + this.endpoint + 'upload/', uploadData, { responseType: 'json' });
  }
}
