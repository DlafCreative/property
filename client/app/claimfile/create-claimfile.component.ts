import { Component, HostBinding }           from '@angular/core';
import { ClaimFileActions }                 from '../../actions';
import { ClaimFileDraft }                   from '../shared/claimfile';

import { select }                           from 'ng2-redux';
import { Observable }                       from 'rxjs';

@Component({
    selector: 'prop-create-claimfile',
    templateUrl: 'create-claimfile.component.html',
    styleUrls: ['create-claimfile.component.less']
})
export class CreateClaimFileComponent {

    @HostBinding('class.prop-container') true;

    @select(['claimFile', 'coverages']) coverages$: Observable<any>;
    @select(['claimFile', 'isSubmittingDraft']) isSubmittingDraft$: Observable<any>;

    constructor(private claimFileActions: ClaimFileActions) {}

    ngOnInit() {
        /**
         * Clear states on this component 
         */ 
        //Ensure removing previous claimfile from store
        this.claimFileActions.clearCurrentClaimFle();
        // Clear form state 
        this.claimFileActions.isSubmittingDraft(false);

        this.claimFileActions.getCoverages();
    }

    onSubmit(claimFileDraft: ClaimFileDraft) {
        this.claimFileActions.initClaimFile(claimFileDraft);
    }

 }