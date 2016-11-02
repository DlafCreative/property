import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-claimpeek',
    templateUrl: 'claimpeek.component.html',
    styleUrls: ['claimpeek.component.less']
})

export class ClaimPeekComponent {

    @Input()
    data: any;

}