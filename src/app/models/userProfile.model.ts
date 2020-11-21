import { Company } from './company.model';

export class UserProfile {
    public constructor(
        public id?: number,
        public userName?: string,
        public password?: string,
        public email?: string,
        public type?: string,
        public firstName?: string,
        public lastName?: string,
        public address?: string,
        public phoneNumber?: string,
        public dateOfBirth?: string,
        public isLocked?: boolean,
        public company?: Company,
    ) { }

}
