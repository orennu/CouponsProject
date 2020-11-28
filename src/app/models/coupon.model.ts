import { Company } from './company.model';

export class Coupon {
  public constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public imageUuid?: string,
    public imageUrl: string = 'http://localhost:8080/files/',
    public price?: number,
    public category?: string,
    public quantity?: number,
    public startDate?: string,
    public expirationDate?: string,
    public company?: object,
  ) { }
}
