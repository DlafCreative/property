import { 
    Component, 
    ViewChild
} from '@angular/core';

import { AppState }             from '../../shared/appstate.service';
import { DynamicFormComponent } from '../../shared/forms/dynamic-form.component';
import { FormMetadataService }  from './form-metadata.service';

import { ControlBase }          from '../../shared/forms/controls/control-base';

@Component({
    selector: 'prop-damagerisk-form',
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `
})
export class DamageFormComponent {

    /**
     * Form description in JSON received from the API
     */
    formMetadata: ControlBase<any>[]; 

    /**
     * Current claimfile ID
     */
    claimFileId: string;

    /**
     * Form part name, required by the API
     */
    context: string = 'DescriptionOfRisk';

    @ViewChild(DynamicFormComponent)
    dynamicForm: DynamicFormComponent;

    constructor(private formMetadataService: FormMetadataService, private appState: AppState) { 
        this.claimFileId = appState.get('claimFileId');
    }

    ngOnInit() {
        this.formMetadataService.getFormMetadata(this.claimFileId, this.context)
                                    .subscribe(
                                        (metadata) => {
                                            this.formMetadata = metadata;
                                            console.log(this.formMetadata);
                                        }
                                    )
    }

    getValues() {
        return this.dynamicForm.formGroup.value;
    }

    isValid() {
        return this.dynamicForm.formGroup.valid;
    }
}