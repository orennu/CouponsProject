export class Purchase {
  public constructor(
    public id?: number,
    public quantity?: number,
    public purchaseDate?: Date,
    public couponId?: number,
    public customerId?: number,
  ) { }
}
