import { Component } from '@angular/core';

@Component({
    selector: 'prop-claimfile-tabs',
    /**
     * @todo : check why Webpack doesn't accept relative path : './claimfile-tabs.component.html'
     * whereas it accepts it on module bootstrap component
     */
    templateUrl : 'app/claimfile/claimfile-tabs/claimfile-tabs.component.html'
})
export class ClaimFileTabsComponent {

    constructor() {}
}