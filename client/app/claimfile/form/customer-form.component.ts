import { Component } from '@angular/core';

import { FormMetadataService } from './form-metadata.service';

import { ControlBase } from '../../shared/forms/controls/control-base';

@Component({
    template: `
        <dynamic-form [controls]="formMetadata" *ngIf="formMetadata"></dynamic-form>
    `,
    providers: [FormMetadataService]
})
export class CustomerFormComponent {

    formMetadata: ControlBase<any>[]; 

    /*formMetadata: ControlBase<any>[] = [
        new Textbox ({ 
            controlType : "textbox",
            key : "customerReference",
            label : "Customer's reference",
            order : 1,
            required : true,
            type : "",
            value : null })
    ]; */

    constructor(private formMetadataService: FormMetadataService) { }

    ngOnInit() {
        this.formMetadataService.getFormMetadata('FR75P00000012', 'CustomerInformation')
                                    .subscribe(
                                        (metadata) => {
                                            this.formMetadata = metadata;
                                            console.log(this.formMetadata);
                                        }
                                    )
    }
}