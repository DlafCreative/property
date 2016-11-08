import { Component, ViewChild } from '@angular/core';

import { DynamicFormComponent } from '../../shared/forms/dynamic-form.component';

import { FormPartService }      from './form-part.service';
import { AppState }             from '../../shared/appstate.service';

import { ControlBase }          from '../../shared/forms/controls/control-base';

@Component({
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `
})
export class FormPartBaseComponent {

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
    context: string;

    @ViewChild(DynamicFormComponent)
    dynamicForm: DynamicFormComponent;

    constructor(protected formPartService: FormPartService, protected appState: AppState) { 
        this.claimFileId = appState.get('claimFileId');
    }

    ngOnInit() {
        this.formPartService.getFormMetadata(this.claimFileId, this.context)
                                    .subscribe(
                                        (metadata) => {
                                            this.formMetadata = metadata;
                                            console.log(this.formMetadata);
                                        }
                                    )
    }

    getContext() {
        return this.context;
    }

    /**
     * Get values of private dynamic form
     */
    getValues() {
        return this.dynamicForm.formGroup.value;
    }

    /**
     * Check if form is valid or invalid
     */
    isValid() {
        return this.dynamicForm.formGroup.valid;
    }

    /**
     * Check if form is dirty
     */
    isDirty() {
        return this.dynamicForm.formGroup.dirty;
    }
}