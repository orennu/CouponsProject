export class CartItem {
  public constructor(
    public title?: string,
    public price?: number,
    public couponId?: number,
    public quantity?: number,
  ) { }
}
