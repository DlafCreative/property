import { NgModule }                     from '@angular/core';
import { BrowserModule } 	            from '@angular/platform-browser';
import { CommonModule }		            from '@angular/common';
import { HttpModule }		            from '@angular/http';
import { RouterModule }                 from '@angular/router';
import { FormsModule } 		            from '@angular/forms';

import { UIModule }                     from '../shared/ui.module';

import { JsonApiModule }                from 'angular2-jsonapi';

import { ClaimFileComponent }           from './claimfile.component';
import { AppendixTabsComponent }        from './appendix-tabs/appendix-tabs.component';
import { DataBannerComponent }          from './databanner/databanner.component';
import { CreateClaimFileComponent }     from './create-claimfile.component';
import { MainComponent }                from './main/main.component';
import { EditorComponent }              from './editor/editor.component';

/**
 * Dynamic forms
 */
import { DynamicFormModule } from '../shared/forms/dynamic-form.module';

/** Import forms */
import { 
    CustomerFormComponent,
    ClaimFileFormComponent,
    ContractFormComponent,
    DamageFormComponent
} from './form';

@NgModule({
    bootstrap: [ ClaimFileComponent ],
    imports: [ 
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        UIModule,
        JsonApiModule,
        DynamicFormModule,
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
                        redirectTo: 'main',
                        pathMatch: 'full'
                    },
                    {
                        path: 'main',
                        component: MainComponent
                    },
                    {
                        path: 'edit',
                        component: EditorComponent,
                        children: [
                            { path: '', redirectTo: 'customer', component: CustomerFormComponent },
                            { path: 'customer', component: CustomerFormComponent },
                            { path: 'contract', component: ContractFormComponent },
                            { path: 'claimfile', component: ClaimFileFormComponent },
                            { path: 'damage', component: DamageFormComponent },
                        ]
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
        DataBannerComponent,
        CreateClaimFileComponent,
        MainComponent,
        EditorComponent,
        CustomerFormComponent,
        ClaimFileFormComponent,
        ContractFormComponent,
        DamageFormComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimFileModule {}