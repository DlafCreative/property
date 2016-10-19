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

@NgModule({
    bootstrap: [ ClaimFileComponent ],
    imports: [ 
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        UIModule,
        JsonApiModule,
        RouterModule.forChild([
            {
                path: 'claimfile',
                children: [
                    {
                        path: 'create',
                        component: CreateClaimFileComponent
                    },
                    {
                        path: ':id',
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
                ]
            }
        ]) 
    ],
    declarations: [
        ClaimFileComponent,
        AppendixTabsComponent,
        DataBannerComponent,
        CreateClaimFileComponent,
        MainComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimFileModule {}