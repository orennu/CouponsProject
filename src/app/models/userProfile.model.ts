export class UserProfile {
    public constructor(
        public id: number,
        public userName: string,
        public email: string,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
        public phoneNumber?: string,
        public dateOfBirth?: string,
    ) { }
}