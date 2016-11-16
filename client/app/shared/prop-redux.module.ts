import { NgModule }                 from '@angular/core';

import { NgReduxModule, NgRedux }   from 'ng2-redux';

import { rootReducer, IAppState }   from '../../store/store';

@NgModule({
    imports: [ NgReduxModule.forRoot() ]
})
export class PropReduxModule { 
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, {});
    }
 }
