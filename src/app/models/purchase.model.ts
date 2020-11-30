export class Purchase {
  public constructor(
    public id?: number,
    public quantity?: number,
    public purchaseDate?: string,
    public couponId?: number,
    public couponTitle?: string,
    public couponPrice?: number,
    public couponCategory?: string,
    public amount?: number,
    public customer?: object,
    public customerFullName?: string,
  ) { }
}
