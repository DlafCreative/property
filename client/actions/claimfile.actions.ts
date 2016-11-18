import { Injectable }   from '@angular/core';
import { NgRedux }      from 'ng2-redux';
import { IAppState }    from '../store';

import { ClaimFileService }     from '../app/shared';

import { ClaimFileDraft }       from '../app/shared';
import { ClaimFile }            from '../app/shared';

@Injectable()
export class ClaimFileActions {

    static SET_COVERAGES = 'SET_COVERAGES';

    isSubmittingDraft: boolean = false;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private claimFileService: ClaimFileService
    ) {}

    initClaimFile(claimFileDraft: ClaimFileDraft) {
        this.isSubmittingDraft = true;
        this.claimFileService.createClaimFile(claimFileDraft).subscribe(
            (claimFile: ClaimFile) => {
                console.log(claimFile);
            }
        )
    }

    getClaimFileById(id) {}
    
    getClaimFileCoverages() {
        this.claimFileService.getCoverages().subscribe(
            (body) => {
                this.ngRedux.dispatch({ type: ClaimFileActions.SET_COVERAGES, payload: { coverages: body.data } })
            }
        )
    }
}