/**
 * Core modules
 */
import { JsonApiModule }			from 'angular2-jsonapi';
import { NgModule } 				from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { CommonModule }				from '@angular/common';
import { HttpModule }				from '@angular/http';
import { RouterModule }				from '@angular/router';
import { FormsModule } 				from '@angular/forms';

/**
 * Import other modules
 */
/** jsonApi module and custom datastore */
import { Datastore }		from './shared/datastore.service';

/** UI module */
import { UIModule } from './shared/ui.module';

/** PrimeNg **/
import { DataTableModule, SharedModule } from 'primeng/primeng';

// App routes definitions
import { ROUTES } from './app.routes';

/** ClaimFile module */
import { ClaimFileModule } from './claimfile/claimfile.module';

// App Components
import { AppComponent }			from './app.component';
import { HeaderComponent }		from './shared/header/header.component';
import { LoginPageComponent } 	from './authentication/login-page.component';

import { ClaimFilesPageComponent } 	from './claimfiles/claimfiles-page.component';

// Services
import { ClaimFileService }  from './shared/claimfile/claimfile.service';

@NgModule({
	bootstrap: 		[ AppComponent ],
	imports:		[ 
		BrowserModule,
		CommonModule,
		HttpModule,
		JsonApiModule,
		UIModule,
		DataTableModule, SharedModule, // PrimeNg datatable
		FormsModule,
		ClaimFileModule,
		RouterModule.forRoot( ROUTES )
	],
	declarations: 	[
		AppComponent,
		HeaderComponent,
		LoginPageComponent,
		ClaimFilesPageComponent
	],
	providers: [
		Datastore,
		ClaimFileService
	]
})
export class AppModule {}