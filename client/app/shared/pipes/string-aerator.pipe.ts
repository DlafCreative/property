import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe allows to put a character for splitting a long string and make it more readable
 * (For the moment, it specifically only put spaces at some places of a WAN id)
 */
@Pipe({name: 'stringAerator'})
export class StringAeratorPipe implements PipeTransform {

    transform(string): string {
        string = string.replace(/\s+/g, ''); 
        let output = `${string.substr(0,4)} ${string.substr(4,3)} ${string.substr(7,3)} ${string.substr(10,3)}`;
        return output;
    }

}