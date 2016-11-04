import { Component, HostBinding } from '@angular/core';

import { AppState }                         from '../../shared/appstate.service';

import { ClaimFile } from '../../shared/claimfile/claimfile.model';

@Component({
    selector: 'prop-claimfile-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.less']
})
export class OverviewComponent {

    @HostBinding('class.prop-container') true;

    claimFile: ClaimFile;

    constructor(private appState: AppState){}

    ngOnInit() {
        debugger;
        var appState = this.appState;
        this.claimFile = this.appState.get('claimFile');
        setTimeout(function(){
            console.log(appState.state)
        }, 5000);
    }
}