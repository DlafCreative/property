import { Component, HostBinding }    from '@angular/core';
import { Http }         from '@angular/http';
import { Router }       from '@angular/router';
import { AuthService }  from './../shared/auth.service'; 

import { NgRedux, select }      from 'ng2-redux';
import { IAppState }            from '../../store/store';
import { Observable }           from 'rxjs';

@Component({
    selector:       'prop-login',
    templateUrl:    'login-page.component.html',
    styleUrls:      ['login-page.component.less'],
    providers:      [ AuthService ]
})
export class LoginPageComponent {

    @HostBinding('class.prop-wrapper')

    customer_number: string = 'FR0001';
    username: string = 'gbu';
    password: string = 'aaa';

    isProcessing: boolean = false;

    constructor(private http: Http, private authService: AuthService, private router: Router, private ngRedux: NgRedux<IAppState>) {}

    onSubmit() {

        this.isProcessing = true;        
        let router = this.router;

        this.authService.login(this.username, this.password, this.customer_number)
                        .subscribe( (data) => {                            
                                        this.isProcessing = false;
                                        if (!data.access_token){
                                            // Wrong login                        
                                            //Materialize.toast(data.error_description, 5000);    
                                        }
                                        else {
                                            // Set user and redirect
                                            localStorage.setItem('prop_access_token', data.access_token);
                                            router.navigate(['./claimfiles']);
                                        }
                                    }, 
                                    error => console.log(error));
    }
}