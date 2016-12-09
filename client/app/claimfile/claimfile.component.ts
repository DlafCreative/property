import { Component, HostBinding }           from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { ClaimFileActions }                 from '../../actions';

import { select }                           from 'ng2-redux';
import { Observable }                       from 'rxjs';

@Component({
    selector: 'prop-claimfile',
    templateUrl: 'claimfile.component.html',
    styleUrls: ['claimfile.component.less']
})
export class ClaimFileComponent {

    @HostBinding('class.prop-wrapper') true; // @todo : why true is necessary here and not elsewhere ?

    @select(['claimFile', 'currentClaimFile']) currentClaimFile$: Observable<any>;
    
    constructor(
        private route: ActivatedRoute,
        private claimFileActions: ClaimFileActions ){ }

    ngOnInit() {
        let claimFileId = this.route.snapshot.params['id'];
        let currentClaimFile = this.claimFileActions.getState().claimFile.currentClaimFile;

        /** Retrieve requested claimfile if needed */
        if (claimFileId) {
            if (!currentClaimFile || currentClaimFile.wan !== claimFileId) {
                this.claimFileActions.getClaimFile(claimFileId);
            }
        }
    }

    ngOnDestroy() {
        this.claimFileActions.clearCurrentClaimFle();
    }

}