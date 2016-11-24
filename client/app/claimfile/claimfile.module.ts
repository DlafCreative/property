import { NgModule }                     from '@angular/core';
import { BrowserModule } 	            from '@angular/platform-browser';
import { CommonModule }		            from '@angular/common';
import { HttpModule }		            from '@angular/http';
import { RouterModule }                 from '@angular/router';
import { FormsModule } 		            from '@angular/forms';

/**
 * Property Redux module
 */
import { PropReduxModule }			    from '../shared/prop-redux.module';

import { UIModule }                     from '../shared/ui.module';

import { JsonApiModule }                from 'angular2-jsonapi';

import { StepperModule }                from '../shared/stepper/stepper.module';

import { ClaimFileComponent }           from './claimfile.component';
import { AppendixTabsComponent }        from './appendix-tabs/appendix-tabs.component';
import { ClaimPeekComponent }           from './claimpeek/claimpeek.component';
import { CreateClaimFileComponent }     from './create-claimfile.component';
import { OverviewComponent }            from './overview/overview.component';
import { TaskTileComponent }            from './overview/task-tile/task-tile.component';
import { EditorComponent }              from './editor/editor.component';

/**
 * Dynamic forms
 */
import { DynamicFormModule } from '../shared/forms/dynamic-form.module';

/** Import forms */
import { 
    ClaimFileDraftFormComponent,
    CustomerFormComponent,
    ClaimFileFormComponent,
    ContractFormComponent,
    DamageFormComponent
} from './form';

/** Import services */
import { AppState }             from '../shared/appstate.service';
import { FormPartService }      from './form/form-part.service';

@NgModule({
    bootstrap: [ ClaimFileComponent ],
    imports: [ 
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        PropReduxModule,
        UIModule,
        JsonApiModule,
        DynamicFormModule,
        StepperModule,
        RouterModule.forChild([
            {
                path: 'claimfile',
                component: ClaimFileComponent,
                children: [
                    {
                        path: 'create',
                        component: CreateClaimFileComponent
                    }
                ]
            },
            {
                path: 'claimfile/:id',
                component: ClaimFileComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'overview',
                        pathMatch: 'full'
                    },
                    {
                        path: 'overview',
                        component: OverviewComponent
                    },
                    {
                        path: 'edit/:form',
                        component: EditorComponent
                    },
                    {
                        path: 'mission'
                    },
                    {
                        path: 'parts'
                    },
                    {
                        path: 'claim-direction'
                    },
                    {
                        path: 'damage-description'
                    }, 
                    {
                        path: 'documents'
                    }
                ]
            }
        ])
    ],
    declarations: [
        ClaimFileComponent,
        AppendixTabsComponent,
        ClaimPeekComponent,
        CreateClaimFileComponent,
        ClaimFileDraftFormComponent,
        OverviewComponent,
        EditorComponent,
        CustomerFormComponent,
        ClaimFileFormComponent,
        ContractFormComponent,
        DamageFormComponent,
        TaskTileComponent
    ],
    providers: [
        AppState,
        FormPartService
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimFileModule {}