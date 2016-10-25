/**
 * This module loads all modules/components/libraries/css related to the user interface. 
 * Import it in each submodules, in "imports" array.
 */
import { NgModule }         from '@angular/core';
import { CommonModule }		from '@angular/common';
import { ReactiveFormsModule } 		from '@angular/forms';
import { UIModule }                 from '../ui.module';

/** Import dynamic form components */
import { FormGeneratorService }         from './form-generator.service';
import { MetadataTranslatorService }        from './metadata-translator.service';
import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormControlComponent }  from './dynamic-control.component';

/** Import pipes */
import { KeysPipe } from '../pipes/keys.pipe';

@NgModule({
	imports: [
		CommonModule,
        UIModule,
        ReactiveFormsModule
	],
	declarations: [ 
        DynamicFormComponent,
        DynamicFormControlComponent,
        KeysPipe
	],
    providers: [
        FormGeneratorService,
        MetadataTranslatorService
    ],
	exports: [ 
        DynamicFormComponent
	]
})
export class DynamicFormModule {}