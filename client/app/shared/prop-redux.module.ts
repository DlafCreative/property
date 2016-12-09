import { NgModule }                 from '@angular/core';
import { 
    NgReduxModule, 
    NgRedux,
    DevToolsExtension }             from 'ng2-redux';

import { rootReducer, IAppState }   from '../../store/store';

import { SessionActions }           from '../../actions';
import { SessionService }           from './session.service';
import { ClaimFileActions }         from '../../actions';
import { ClaimFileService }         from './claimfile';

@NgModule({
    imports: [ NgReduxModule.forRoot() ],
    providers: [ 
        SessionService,
        SessionActions,
        ClaimFileActions,
        ClaimFileService
    ]
})
export class PropReduxModule { 
    constructor(
        ngRedux: NgRedux<IAppState>, 
        devTools: DevToolsExtension ) {
            
        ngRedux.configureStore(rootReducer, {
            claimFile: {
                currentClaimFile: null,
                isSubmittingDraft: false
            },
            claimFiles: {
                collection: null
            }
        });
    }
 }
