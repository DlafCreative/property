import { Component } from '@angular/core';

import { ClaimFile } from '../shared/claimfile.model';

import { ClaimFileService } from '../shared/claimfile.service';
import { Datastore } from '../../shared/datastore.service';

@Component({
    selector: 'prop-quick-create-claimfile',
    templateUrl: 'quick-create-claimfile.component.html'
})
export class QuickCreateClaimFileComponent {

    claimFile: ClaimFile;

    submitted = false;

    constructor(private claimFileService: ClaimFileService) { 
        this.claimFile = this.claimFileService.createModel();
     }

    onSubmit() {
        console.log(this.claimFile);
        this.claimFileService.createClaimFile(this.claimFile);
        this.submitted = true;
    }

    get diagnostic() { return JSON.stringify(this.claimFile) }
}