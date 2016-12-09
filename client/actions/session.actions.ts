import { Injectable }       from '@angular/core';
import { NgRedux }          from 'ng2-redux';
import { IAppState }        from '../store';

import { SessionService }   from '../app/shared';
import { HttpClient }       from '../app/shared';
import { TalkService }      from '../app/shared';    

import { Router }           from '@angular/router';

@Injectable()
export class SessionActions {

    static SET_USER_DATA = 'SET_USER_DATA';
    static SET_PROCESSING = 'SET_PROCESSING';
    static USER_LOGOUT = 'USER_LOGOUT';

    constructor(
        private ngRedux: NgRedux<IAppState>, 
        private sessionService: SessionService,
        private httpClient: HttpClient,
        private router: Router,
        private talk: TalkService) {}

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
            },
            (errorObject) => {
                this.setProcessing(false);
                if (errorObject.errors[0].status === 400) {
                    this.talk.toast(errorObject.errors[0].detail);
                }
                else {
                    this.talk.alert(errorObject);
                }
                
            }
        );
    }

    logout() {
        this.ngRedux.dispatch({ type: SessionActions.USER_LOGOUT });
        localStorage.removeItem('prop_access_token');
        this.httpClient.flushAuthHeaders();
        //this.router.navigateByUrl('/claimfiles'); // Cause weird behavior
        window.location.href = '/login';
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