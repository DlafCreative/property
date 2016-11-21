import { Component, HostBinding }   from '@angular/core';

import { ClaimFile }                from '../../shared';

import { select }                   from 'ng2-redux';
import { Observable }               from 'rxjs';

@Component({
    selector: 'prop-claimfile-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.less']
})
export class OverviewComponent {

    @HostBinding('class.prop-container') true;

    @select(['claimFile', 'currentClaimFile']) claimFile$: Observable<ClaimFile>;
    
}