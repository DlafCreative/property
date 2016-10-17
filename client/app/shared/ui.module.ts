/**
 * This module loads all modules/components/libraries/css related to the user interface. 
 * Import it in each submodules, in "imports" array.
 */
import { NgModule } from '@angular/core';
import { CommonModule }		from '@angular/common';

/*
 * Import global css
 */
import '../../assets/css/styles.less';

/*
 * Import Materialize css + javascript. These aliases are defined in the webpack 
 * common config
 */
import 'materializecss';
import 'materialize';

/* Import angular2-materialize (Angular2 directives) */
import { MaterializeDirective } from 'angular2-materialize';

/* Import Material2 (Angular2 Material components) */
import { MaterialModule } from '@angular/material';

/** Import Property components */
import { KpiComponent, KpiContainerComponent } from './kpi';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule.forRoot()
	],
	declarations:   [ 
		MaterializeDirective,
		KpiComponent, KpiContainerComponent
	],
	exports: 		[ 
		MaterializeDirective, MaterialModule,
		KpiComponent, KpiContainerComponent
	]
})
export class UIModule {}