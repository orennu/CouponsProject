import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (
                    val.email?.toLocaleLowerCase().includes(args) ||
                    val.firstName?.toLocaleLowerCase().includes(args) ||
                    val.lastName?.toLocaleLowerCase().includes(args) ||
                    val.phoneNumber?.toLocaleLowerCase().includes(args) ||
                    val.userName?.toLocaleLowerCase().includes(args) ||
                    val.type?.toLocaleLowerCase().includes(args)
                  );

      return rVal;
    })

  }

}
