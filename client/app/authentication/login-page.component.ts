import { Component, HostBinding }       from '@angular/core';
import { Router }                       from '@angular/router';

import { SessionActions }               from '../../actions/session.actions';
import { select }                       from 'ng2-redux';

import { Observable }                   from 'rxjs';

@Component({
    selector:       'prop-login',
    templateUrl:    'login-page.component.html',
    styleUrls:      ['login-page.component.less']
})
export class LoginPageComponent {

    @HostBinding('class.prop-wrapper')

    @select(['session', 'isProcessing']) isProcessing;
    @select(state => state.session.isLogged) isLogged$: Observable<any>;

    userData = {
        customer_number: 'FR0001',
        username: 'gbu',
        password: 'aaa'
    };

    constructor(
        private router: Router, 
        private sessionActions: SessionActions
        ) {}

    ngOnInit() {
        const { session } = this.sessionActions.getState();
        if (session.isLogged || localStorage.getItem('prop_access_token')) {
            this.router.navigate(['/claimfiles']);
        }
    }

    onSubmit() {
        this.sessionActions.loginUser(this.userData);
    }
}