/**
 * This module loads all modules/components/libraries/css related to the user interface. 
 * Import it in each submodules, in "imports" array.
 */
import { NgModule } from '@angular/core';
import { CommonModule }		from '@angular/common';

/*
 * Import Materialize css + javascript. These aliases are defined in the webpack 
 * common config
 */
//import '@angular/material/core/theming/prebuilt/indigo-pink.css';
import 'materializecss';
import 'materialize';

/*
 * Import global css
 */
import '../../assets/css/styles.less';
import '../../assets/css/material.scss';

/* Import angular2-materialize (Angular2 directives) */
import { MaterializeDirective } from 'angular2-materialize';

/* Import Material2 (Angular2 Material components) */
import { MaterialModule } from '@angular/material';

/** Import PrimeNG components */
import { DropdownModule } from 'primeng/primeng';

/** Import Talk components */
import { 
	TalkService,
	TalkDialogComponent } 	from './talk';

/** Import Property components */
import { 
	KpiComponent, 
	KpiContainerComponent } from './kpi';

import { NaLabelPipe } 			from './pipes';
import { StringAeratorPipe } 	from './pipes';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule.forRoot(),
		DropdownModule
	],
	declarations:   [ 
		MaterializeDirective,
		KpiComponent, KpiContainerComponent,
		NaLabelPipe,
		StringAeratorPipe,
		TalkDialogComponent
	],
	entryComponents: [
		TalkDialogComponent
	],
	providers: [
		TalkService
	],
	exports: 		[ 
		MaterializeDirective, MaterialModule,
		DropdownModule,
		KpiComponent, KpiContainerComponent,
		NaLabelPipe,
		StringAeratorPipe
	]
})
export class UIModule {}