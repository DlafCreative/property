/*
 * Application routes
 */
// Core import
import { Routes, RouterModule } from '@angular/router';

// Component imports
import { LoginPageComponent } from './authentication/login-page.component';

import { ClaimFilesPageComponent } from './claimfiles/claimfiles-page.component';

export const ROUTES: Routes = [
	{ path: '',                     redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login',                component: LoginPageComponent },
    { path: 'claimfiles',           component: ClaimFilesPageComponent }
];