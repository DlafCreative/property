import { Component } from '@angular/core';

@Component({
    selector: 'prop-appendix-tabs',
    templateUrl: 'appendix-tabs.component.html',
    styleUrls: ['appendix-tabs.component.less']
})
export class AppendixTabsComponent {

    coucou = '12345';

    constructor() {}

    onFocusChange(event){
        console.log(event)
    }
}