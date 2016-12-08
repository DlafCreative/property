import { Component, Input, SimpleChanges }     from '@angular/core';
import { FormGroup }            from '@angular/forms';

import { ControlBase }          from './controls/control-base';
import { FormGeneratorService } from './form-generator.service';

@Component({
    selector: 'dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    providers: [ FormGeneratorService ]
})
export class DynamicFormComponent {
  
    /**
     * Passed controls as Observable
     */
    @Input() 
    metadataObs;

    /** Provide submit button ? onSubmit() will be executed */
    @Input()
    submitButton: boolean = false;

    /** Reference to form description returned by metadataObs subscribing */
    formDescription: any;

    /** Reference to ng2 form group */
    formGroup: FormGroup;

    payLoad: string = '';

    constructor(private formGeneratorService: FormGeneratorService) { }

    ngOnChanges(changes: SimpleChanges) {
        /** Async metadataObs */  
        if (changes['metadataObs'].currentValue) {
            this.metadataObs.subscribe(
                metadata => {
                    this.formGroup = this.formGeneratorService.toFormGroup(metadata);
                    this.formDescription = metadata;
                }
            )
        }
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.formGroup.value);
    }
}