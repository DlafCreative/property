import { NgModule }                 from '@angular/core';
import { NgReduxModule, NgRedux }   from 'ng2-redux';

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
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, {
            claimFile: {
                currentClaimFile: null
            }
        });
    }
 }
