import { Injectable }   from '@angular/core';
import { NgRedux }      from 'ng2-redux';
import { IAppState }    from '../store';

import { SessionService }   from '../app/shared';

@Injectable()
export class SessionActions {

    static SET_USER_DATA = 'SET_USER_DATA';
    static SET_PROCESSING = 'SET_PROCESSING';

    constructor(
        private ngRedux: NgRedux<IAppState>, 
        private sessionService: SessionService) {}

    loginUser(credentials) {
        this.setProcessing(true);
        this.sessionService.login(credentials).subscribe(
            (data) => {
                if (data.access_token) {
                    this.ngRedux.dispatch({
                        type: SessionActions.SET_USER_DATA,
                        payload: Object.assign(data, credentials)
                    });
                    console.log(this.ngRedux.getState());
                }
                else {

                }
                this.setProcessing(false);
            },
            // @Todo : handle Observable errors
            (error) => {
                console.log(error);
            }
        );
    }

    setProcessing(flag: boolean) {
        this.ngRedux.dispatch({
            type: SessionActions.SET_PROCESSING,
            payload: { isProcessing: flag }
        });
    }
}