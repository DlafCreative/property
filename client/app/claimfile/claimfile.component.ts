import { Component, HostBinding }           from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { AppState }                         from '../shared/appstate.service';

import { ClaimFile }                        from '../shared/claimfile/claimfile.model';

@Component({
    selector: 'prop-claimfile',
    templateUrl: 'claimfile.component.html',
    styleUrls: ['claimfile.component.less']
})
export class ClaimFileComponent {

    @HostBinding('class.prop-wrapper') true; // @todo : why true is mandatory ?

    claimFile: ClaimFile;

    ClaimFileComponent;
    constructor(private route: ActivatedRoute, private appState: AppState){ }

    ngOnInit(){ 
        // Save current claimfile ID to the AppState to expose it to the subforms
        let claimfileId = this.route.snapshot.params['id'];
        this.appState.set('claimFileId', claimfileId);
    }

}