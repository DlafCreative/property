import { Component, HostBinding } from '@angular/core';

import { Datastore } from './../shared/datastore.service';

import { ClaimFile } from './../shared/claimfile/claimfile.model';
import { Http, Headers, RequestOptions } 	from '@angular/http';

@Component({
    selector: 'prop-create-claimfile',
    templateUrl: 'create-claimfile.component.html'
})
export class CreateClaimFileComponent { 

    @HostBinding('class.prop-wrapper')

    claimFile: ClaimFile;

    submitted = false;

    constructor(private datastore: Datastore) {
        this.claimFile = this.datastore.createRecord(ClaimFile);
    }

    onSubmit() {
        this.submitted = true;
        this.claimFile.save().subscribe(
            (claimFile: ClaimFile) => console.log(claimFile)
        );
    }

 }