import { Injectable }           from '@angular/core';
import { NgRedux }              from 'ng2-redux';
import { IAppState }            from '../store';

import { ClaimFileService }     from '../app/shared';

import { ClaimFileDraft }       from '../app/shared';
import { ClaimFile }            from '../app/shared';

/** Include ng2-router for redirection */
import { Router }               from '@angular/router';

@Injectable()
export class ClaimFileActions {

    static SET_COVERAGES = 'SET_COVERAGES';
    static SET_CURRENT_CLAIMFILE = 'SET_CURRENT_CLAIMFILE';
    static CLEAR_CURRENT_CLAIMFILE = 'CLEAR_CURRENT_CLAIMFILE';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private claimFileService: ClaimFileService,
        private router: Router
    ) {}

    initClaimFile(claimFileDraft: ClaimFileDraft) {
        this.setSubmittingDraft(true);
        this.claimFileService.createClaimFile(claimFileDraft).subscribe(
            (claimFile: ClaimFile) => {
                this.ngRedux.dispatch({ type: ClaimFileActions.SET_CURRENT_CLAIMFILE, payload: { currentClaimFile: claimFile} });
                this.router.navigate(['/claimfile', claimFile.wan]);
            }
        )
    }

    setSubmittingDraft(flag: boolean) {
        this.ngRedux.dispatch({ type: 'IS_SUBMITTING_DRAFT', payload: { isSubmittingDraft: flag } });
    }

    getClaimFile(id: string) {
        this.claimFileService.getClaimFileById(id).subscribe(
            (claimFile) => {
                this.ngRedux.dispatch({ type: ClaimFileActions.SET_CURRENT_CLAIMFILE, payload: { currentClaimFile: claimFile} });
            }
        )
    }
    
    getCoverages() {
        this.claimFileService.getCoverages().subscribe(
            (body) => {
                this.ngRedux.dispatch({ type: ClaimFileActions.SET_COVERAGES, payload: { coverages: body.data } });
            }
        )
    }

    clearCurrentClaimFle() {
        this.ngRedux.dispatch({ type: ClaimFileActions.CLEAR_CURRENT_CLAIMFILE });
    }
}