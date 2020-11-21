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
        val.email?.toLocaleLowerCase().includes(args) ||
        val.firstName?.toLocaleLowerCase().includes(args) ||
        val.lastName?.toLocaleLowerCase().includes(args) ||
        val.phoneNumber?.toLocaleLowerCase().includes(args) ||
        val.userName?.toLocaleLowerCase().includes(args) ||
        val.type?.toLocaleLowerCase().includes(args) ||
        val.name?.toLocaleLowerCase().includes(args) ||
        val.industry?.toLocaleLowerCase().includes(args) ||
        val.title?.toLocaleLowerCase().includes(args) ||
        val.company?.name.toLocaleLowerCase().includes(args) ||
        val.price <= args
      );

      return rVal;
    })

  }

}
