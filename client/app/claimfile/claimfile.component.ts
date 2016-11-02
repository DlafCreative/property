import { Component, HostBinding }           from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { Datastore }                        from '../shared/datastore.service';
import { AppState }                         from '../shared/appstate.service';

import { ClaimFile }                        from '../shared/claimfile/claimfile.model';
import { Step }                             from '../shared/stepper/step.model';

@Component({
    selector: 'prop-claimfile',
    templateUrl: 'claimfile.component.html',
    styleUrls: ['claimfile.component.less']
})
export class ClaimFileComponent {

    @HostBinding('class.prop-wrapper') true; // @todo : why true is necessary here and not elsewhere ?

    claimFile: ClaimFile;
    claimFileStep = 'COVERAGE_CHECKING'; // @Todo : get step name from backend
    
    constructor(private route: ActivatedRoute, public appState: AppState, private datastore: Datastore){ }

    ngOnInit(){
        // Save current claimfile ID to the AppState to expose it to the subforms
        let claimfileId = this.route.snapshot.params['id'];
        this.appState.set('claimFileId', claimfileId);

        // Get current claimfile if needed
        if (!this.claimFile && !this.appState.state.claimFile){
            this.datastore.findRecord(ClaimFile, claimfileId)
                          .subscribe(
                              (claimFile: ClaimFile) => {
                                  delete claimFile._datastore;
                                  this.appState.set('claimFile', claimFile);
                                  this.claimFile = this.appState.get('claimFile');
                              }
                          )
        }

        // Set claimFileStep with included step id/name
        // ...
    }

}