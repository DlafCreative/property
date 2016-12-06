import { 
    Component, 
    Input, 
    ViewChild }                 from '@angular/core';

import { DynamicFormComponent } from '../../shared/forms/dynamic-form.component';

import { FormPartService }      from './form-part.service';

import { ControlBase }          from '../../shared/forms/controls/control-base';

import { select }               from 'ng2-redux';
import { Observable }           from 'rxjs';

export class FormPartBaseComponent {

    /**
     * Form description in JSON received from the API and transformed to ng2 form components
     */
    formMetadata$: Observable<any>; 

    /**
     * Current claimfile ID
     */
    @Input()
    claimFileId: string;

    /**
     * Form title
     */
    protected title: string;

    /**
     * Form part name, required by the API
     */
    protected context: string;

    @ViewChild(DynamicFormComponent)
    dynamicForm: DynamicFormComponent;

    static metaData = {
        inputs: ['claimFileId'],
        queries: {
            dynamicForm: new ViewChild(DynamicFormComponent)
        }
    };

    constructor(
        protected formPartService: FormPartService) { 
    }

    ngOnInit() {
        this.formMetadata$ = this.formPartService.getFormMetadata(this.claimFileId, this.context);
    }

    getContext() {
        return this.context;
    }

    getTitle() {
        return this.title;
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