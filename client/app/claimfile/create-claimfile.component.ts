import { Component, HostBinding }           from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';
import { Router }                           from '@angular/router';

import { Datastore }                        from './../shared/datastore.service';

import { ClaimFile }                        from './../shared/claimfile/claimfile.model';

@Component({
    selector: 'prop-create-claimfile',
    templateUrl: 'create-claimfile.component.html',
    styleUrls: ['create-claimfile.component.less']
})
export class CreateClaimFileComponent {

    claimFile: ClaimFile;

    submitted = false;

    constructor(private router: Router, private datastore: Datastore) {
        this.claimFile = this.datastore.createRecord(ClaimFile);
    }

    onSubmit() {
        this.submitted = true;
        this.claimFile.save().subscribe(
            (claimFile: ClaimFile) => { 
                console.log(claimFile);
                this.router.navigate(['/claimfile', claimFile.id]);
                // @todo : pass the returned claimFile to the StateStore 
            }
        );
    }

 }