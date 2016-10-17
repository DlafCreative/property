import { NgModule }                 from '@angular/core';
import { BrowserModule } 	        from '@angular/platform-browser';
import { CommonModule }		        from '@angular/common';
import { HttpModule }		        from '@angular/http';
import { RouterModule }             from '@angular/router';
import { FormsModule } 		        from '@angular/forms';

import { UIModule }                 from '../shared/ui.module';

import { JsonApiModule }            from 'angular2-jsonapi';

import { ClaimFileComponent }       from './claimfile.component';
import { AppendixTabsComponent }    from './appendix-tabs/appendix-tabs.component';
import { QuickCreateComponent }     from './quick-create/quick-create.component';

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
                component: ClaimFileComponent,
                children: [
                    {
                        path: 'create',
                        component: QuickCreateComponent
                    },
                    {
                        path: ':id',
                        component: QuickCreateComponent
                    }
                ]
            }
        ]) 
    ],
    declarations: [
        ClaimFileComponent,
        AppendixTabsComponent,
        QuickCreateComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ClaimFileModule {}