import { Component }                from '@angular/core';

import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component(Object.assign({
    selector: 'prop-damagerisk-form',
    template: `
        <dynamic-form [metadataObs]="formMetadata$"></dynamic-form>
    `
}, FormPartBaseComponent.metaData))
export class DamageFormComponent extends FormPartBaseComponent {

    /**
     * Form title
     */
    title = 'Description du risque endommagé';

    /**
     * Form part name, required by the API
     */
    context = 'DescriptionOfRisk';

    constructor(formPartService: FormPartService) { 
        super(formPartService);
    }

}