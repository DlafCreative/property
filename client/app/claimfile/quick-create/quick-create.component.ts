import { Component } from '@angular/core';

import { Datastore } from './../../shared/datastore.service';

import { ClaimFile } from './../../shared/claimfile/claimfile.model';
import { Http, Headers, RequestOptions } 	from '@angular/http';

@Component({
    selector: 'prop-claimfile-quick-create',
    templateUrl: 'quick-create.component.html'
})
export class QuickCreateComponent { 

    claimFile: ClaimFile;

    submitted = false;

    constructor(private datastore: Datastore) {        
        this.datastore.headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('prop_access_token')});
        this.claimFile = this.datastore.createRecord(ClaimFile);
    }

    onSubmit(form) {
        console.log(form);
        //this.submitted = true;
        //this.claimFile.save().subscribe();
    }

 }