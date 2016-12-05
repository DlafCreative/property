import { Component, Input }                from '@angular/core';

import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component(Object.assign({
    selector: 'prop-customer-form',
    template: `
        <dynamic-form [metadataObs]="formMetadata$"></dynamic-form>
    `
}, FormPartBaseComponent.metaData))
export class CustomerFormComponent extends FormPartBaseComponent {

    /**
     * Form title
     */
    title = 'Information client';

    /**
     * Form part name, required by the API
     */
    context = 'CustomerInformation';

    constructor(formPartService: FormPartService) {    
        super(formPartService);
    }
    
}