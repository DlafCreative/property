import { Component }                from '@angular/core';

import { AppState }                 from '../../shared/appstate.service';
import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component({
    selector: 'prop-contract-form',
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `
})
export class ContractFormComponent extends FormPartBaseComponent {

    /**
     * Form part name, required by the API
     */
    context: string = 'Contract';

    constructor(formPartService: FormPartService, appState: AppState) { 
        super(formPartService, appState);
    }
    
}