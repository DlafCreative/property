import { Component } from '@angular/core';

import { FormMetadataService } from './form-metadata.service';

@Component({
    template: `
        <dynamic-form></dynamic-form>
    `,
    providers: [FormMetadataService]
})
export class CustomerFormComponent {

    formMetadata?: any; 

    constructor(private formMetadataService: FormMetadataService) { }

    ngOnInit() {
        this.formMetadataService.getFormMetadata('FR75P00000012', 'CustomerInformation')
                                    .subscribe(
                                        (metadata) => {
                                            this.formMetadata = metadata;
                                        }
                                    )
    }
}