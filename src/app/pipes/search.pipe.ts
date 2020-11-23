import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = (

        val.email?.toLocaleLowerCase().includes(args) || val.email?.includes(args) ||
        val.firstName?.toLocaleLowerCase().includes(args) || val.firstName?.includes(args) ||
        val.lastName?.toLocaleLowerCase().includes(args) || val.lastName?.includes(args) ||
        val.phoneNumber?.toLocaleLowerCase().includes(args) || val.phoneNumber?.includes(args) ||
        new Date(val.dateOfBirth) >= new Date(args) ||
        val.userName?.toLocaleLowerCase().includes(args) || val.userName?.includes(args) ||
        val.type?.toLocaleLowerCase().includes(args) || val.type?.includes(args) ||
        val.name?.toLocaleLowerCase().includes(args) || val.name?.includes(args) ||
        val.industry?.toLocaleLowerCase().includes(args) || val.industry?.includes(args) ||
        val.title?.toLocaleLowerCase().includes(args) || val.title?.includes(args) ||
        new Date(val.expirationDate) < new Date(args) ||
        val.company?.name.toLocaleLowerCase().includes(args) || val.company?.name.includes(args) ||
        val.customer?.fullName.toLocaleLowerCase().includes(args) || val.customer?.fullName.includes(args) ||
        val.couponTitle?.toLocaleLowerCase().includes(args) || val.couponTitle?.includes(args) ||
        val.price <= args ||
        val.amount >= args ||
        new Date(val.purchaseDate) >= new Date(args)
      );

      return rVal;
    })

  }

}
