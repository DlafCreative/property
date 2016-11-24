import { Component }                from '@angular/core';

import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component({
    selector: 'prop-damagerisk-form',
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `
})
export class DamageFormComponent extends FormPartBaseComponent {

    /**
     * Form part name, required by the API
     */
    context: string = 'DescriptionOfRisk';

    constructor(formPartService: FormPartService) { 
        super(formPartService);
    }

}