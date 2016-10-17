import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'prop-create-claimfile',
    templateUrl: './create-claimfile.component.html',
    styleUrls: ['./create-claimfile.component.less']
})
export class CreateClaimFileComponent {

    @HostBinding('class.prop-wrapper') true // ???? Why need to declare true to make it work

    constructor() {}
}