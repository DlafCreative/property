import { Component }                from '@angular/core';

import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component(Object.assign({
    selector: 'prop-contract-form',
    template: `
        <dynamic-form [metadataObs]="formMetadata$"></dynamic-form>
    `
}, FormPartBaseComponent.metaData))
export class ContractFormComponent extends FormPartBaseComponent {

    /**
     * Form title
     */
    title = 'Contrat';

    /**
     * Form part name, required by the API
     */
    context = 'Contract';

    constructor(formPartService: FormPartService) { 
        super(formPartService);
    }
    
}