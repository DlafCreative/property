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
        var appState = this.appState;
        var claimFile = this.claimFile;
        this.claimFile = this.appState.get('claimFile');
        setTimeout(function(){
            console.log(appState.state)
            claimFile = appState.get('claimFile');
        }, 5000);
    }
}