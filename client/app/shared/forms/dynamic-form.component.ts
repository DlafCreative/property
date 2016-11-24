import { Component, Input }     from '@angular/core';
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
     * Passed controls
     */
    @Input() 
    controls = [];

    /**
     * Reference to ng2 form group
     */
    formGroup: FormGroup;

    payLoad: string = '';

    constructor(private formGeneratorService: FormGeneratorService) { }

    ngOnInit() { 
        this.formGroup = this.formGeneratorService.toFormGroup(this.controls);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.formGroup.value);
    }
}