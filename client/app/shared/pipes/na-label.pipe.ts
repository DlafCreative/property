import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe allows to display a label if the passed value is null
 */
@Pipe({name: 'naLabel'})
export class NaLabelPipe implements PipeTransform {

    static DEFAULT_LABEL = 'N/A'; 

    transform(value, label: string[]) : any {
        let labelToDisplay = label || NaLabelPipe.DEFAULT_LABEL;
        if (value === null || value === undefined) {
            return labelToDisplay;
        }
        else {
            return value;
        }
    }

}