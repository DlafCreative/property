import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ControlBase } from './controls/control-base';

/**
 * This service allows to get all elements from the form definition (including fieldset), extract only fields 
 * and return a Ng2 FormGroup element with these fields
 */
@Injectable()
export class FormGeneratorService {
  constructor() { }

  toFormGroup(fieldsetDefinition: any[] ) {
    let group: any = {};

    fieldsetDefinition.forEach(fieldset => {
        fieldset.fields.forEach(field => {
            group[field.key] = field.required ? new FormControl(field.value || '', Validators.required) : 
                                                new FormControl(field.value || '');
        });

    });
    return new FormGroup(group);
  }
}