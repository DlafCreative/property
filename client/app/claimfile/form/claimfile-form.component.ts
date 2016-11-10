import { Component }                from '@angular/core';

import { AppState }                 from '../../shared/appstate.service';
import { FormPartService }          from './form-part.service';

import { FormPartBaseComponent }    from './form-part-base.component';

@Component({
    selector: 'prop-claimfile-form',
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `
})
export class ClaimFileFormComponent extends FormPartBaseComponent {

    /**
     * Form part name, required by the API
     */
    context: string = 'ClaimInformation';

    constructor(formPartService: FormPartService, appState: AppState) { 
        super(formPartService, appState);
    }

}