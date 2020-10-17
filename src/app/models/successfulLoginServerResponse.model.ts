export class SuccessfulLoginServerResponse {
    public constructor(
        public id?: number, 
        public token?: number,
        public type?: string
    ) {}
}