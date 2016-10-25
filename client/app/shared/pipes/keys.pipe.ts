import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe allows to convert an JSON object to Array, iterating over the first level keys
 */
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {

    transform(value, args: string[]) : any {
        if (!value) {
            return value;
        }

        let keys = [];

        for (let key in value) {
            keys.push({value: key, label: value[key]});
        }
        return keys;
    }

}