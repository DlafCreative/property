import { Component, HostBinding }           from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { ClaimFile }                        from '../shared/claimfile/claimfile.model';

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
    currentClaimFileSub = null;
    
    claimFileStep = 'COVERAGE_CHECKING'; // @Todo : get step name from backend
    
    constructor(
        private route: ActivatedRoute,
        private claimFileActions: ClaimFileActions ){ }

    ngOnInit() {
        let claimfileId = this.route.snapshot.params['id'];
        
        /**
         * Double check if current claimfile state is well stored
         */
        if (claimfileId) {
            this.currentClaimFileSub = this.currentClaimFile$.subscribe((claimFile) => {
                if (!claimFile || claimFile.wan !== claimfileId) {
                    this.claimFileActions.getClaimFile(claimfileId);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.currentClaimFileSub) {
            console.log(this.currentClaimFileSub)
            this.currentClaimFileSub.unsubscribe();
        }            
    }

}