/*
 * Application routes
 */
// Core import
import { Routes, RouterModule } from '@angular/router';

// Component imports
import { LoginPageComponent } from './authentication/login-page.component';

import { ClaimFilesPageComponent } from './claimfiles/claimfiles-page.component';

export const ROUTES: Routes = [
	{ path: '',                     component: LoginPageComponent },
    { path: 'claimfiles',           component: ClaimFilesPageComponent },
    /*{ path: 'claimfile',            loadChildren: 'claimfile/claimfile.module#ClaimFileModule'},
    { path: 'claimFile/create',     component: CreateClaimFileComponent },
    { path: 'claimFile/:id',        component: ClaimFileComponent },*/
];