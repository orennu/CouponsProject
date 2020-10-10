export class Coupon {
    public title?: string;
    public description?: string;
    public image?: string;
    public price?: number;
    public category?: string;
    public quantity?: number;
    public startDate?: string;
    public expirationDate?: string;

    constructor(title?: string, description?: string, image?: string, price?: number, 
                category?: string, quantity?: number, startDate?: string, expirationDate?: string) {
            this.title = title;
            this.description = description;
            this.image = image;
            this.price = price;
            this.category = category;
            this.quantity = quantity;
            this.startDate = startDate;
            this.expirationDate = expirationDate;
        }
}