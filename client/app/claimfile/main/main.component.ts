import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'prop-claimfile-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.less']
})
export class MainComponent {

    @HostBinding('class.prop-container') true;

    constructor(){}
}