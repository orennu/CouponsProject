import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private endpoint: string = 'companies/';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private http: HttpClient) { }

  public getCompany(companyId: number): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint + companyId, { responseType: 'json' });
  }

  public getAllCompanies(): Observable<any> {
    return this.http.get<any>(this.config.apiBaseEndpoint + this.endpoint, { responseType: 'json' });
  }

  public addCompany(company: Object): Observable<any> {
    return this.http.post(this.config.apiBaseEndpoint + this.endpoint, company, { responseType: 'json' });
  }

  public updateCompany(company: Object): Observable<any> {
    return this.http.put(this.config.apiBaseEndpoint + this.endpoint, company, { responseType: 'json' });
  }

  public deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(this.config.apiBaseEndpoint + this.endpoint + companyId);
  }

}
