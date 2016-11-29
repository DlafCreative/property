import { Injectable }       from '@angular/core';
import { NgRedux }          from 'ng2-redux';
import { IAppState }        from '../store';

import { SessionService }   from '../app/shared';
import { HttpClient }       from '../app/shared';    

import { Router }           from '@angular/router';

@Injectable()
export class SessionActions {

    static SET_USER_DATA = 'SET_USER_DATA';
    static SET_PROCESSING = 'SET_PROCESSING';

    constructor(
        private ngRedux: NgRedux<IAppState>, 
        private sessionService: SessionService,
        private httpClient: HttpClient,
        private router: Router) {}

    loginUser(credentials) {
        this.setProcessing(true);
        this.sessionService.login(credentials).subscribe(
            (data) => {
                this.setProcessing(false);
                if (data.access_token) {
                    this.ngRedux.dispatch({
                        type: SessionActions.SET_USER_DATA,
                        payload: Object.assign(data, credentials)
                    });
                    // Set token access on localeStorage
                    localStorage.setItem('prop_access_token', data.access_token);
                    // Set authorization header on httpClient 
                    this.httpClient.setAuthHeaders();
                    // Redirect to dashboard
                    this.router.navigate(['/claimfiles']);
                }
                // @todo : return error message to Alert Service
                else {
                    Materialize.toast(data.error, 3000);
                }                
            },
            // @Todo : handle Observable errors and return error to message service
            (error) => {
                console.log(error);
            }
        );
    }

    logout() {
        this.ngRedux.dispatch({ type: 'USER_LOGOUT'});
        localStorage.removeItem('prop_access_token');
        this.httpClient.flushAuthHeaders();
        this.router.navigate(['/']);
    }

    setProcessing(flag: boolean) {
        this.ngRedux.dispatch({
            type: SessionActions.SET_PROCESSING,
            payload: { isProcessing: flag }
        });
    }

    getState() {
        return this.ngRedux.getState();
    }
}