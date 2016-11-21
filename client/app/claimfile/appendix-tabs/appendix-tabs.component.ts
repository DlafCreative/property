import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-appendix-tabs',
    templateUrl: 'appendix-tabs.component.html',
    styleUrls: ['appendix-tabs.component.less']
})
export class AppendixTabsComponent {
    
    @Input()
    disabledTabs: boolean;

    constructor() {}

    onFocusChange(event){
        console.log(event)
    }
}