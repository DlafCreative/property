import { Component } from '@angular/core';

import { Datastore } from './../../shared/datastore.service';

import { ClaimFile } from './../../shared/claimfile/claimfile.model';

@Component({
    selector: 'prop-claimfile-quick-create',
    templateUrl: 'quick-create.component.html'
})
export class QuickCreateComponent { 

    claimFile: ClaimFile;

    submitted = false;

    constructor(private datastore: Datastore) {
        this.claimFile = this.datastore.createRecord(ClaimFile);
    }

    onSubmit() {
        console.log(this.claimFile);
        this.submitted = true;
    }

 }