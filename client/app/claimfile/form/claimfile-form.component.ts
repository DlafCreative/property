import { Component }                from '@angular/core';

import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component(Object.assign({
    selector: 'prop-claimfile-form',
    template: `
        <dynamic-form [metadataObs]="formMetadata$"></dynamic-form>
    `
}, FormPartBaseComponent.metaData))
export class ClaimFileFormComponent extends FormPartBaseComponent {

    /**
     * Form title
     */
    title = 'Contexte';

    /**
     * Form part name, required by the API
     */
    context = 'ClaimInformation';

    constructor(formPartService: FormPartService) { 
        super(formPartService);
    }

}