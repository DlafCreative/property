import { Component } from '@angular/core';

@Component({
    selector: 'prop-appendix-tabs',
    /**
     * @todo : check why Webpack doesn't accept relative path : './claimfile-tabs.component.html'
     * whereas it accepts it on module bootstrap component
     */
    templateUrl : 'app/claimfile/appendix-tabs/appendix-tabs.component.html'
})
export class AppendixTabsComponent {

    coucou = '12345';

    constructor() {}

    onFocusChange(event){
        console.log(event)
    }
}