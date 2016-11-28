import { Component, Input, HostBinding }    from '@angular/core';

import { ClaimFileActions }                 from '../../../actions';

import { select }                           from 'ng2-redux';
import { Observable }                       from 'rxjs';

@Component({
    selector: 'prop-stepper',
    templateUrl: 'stepper.component.html',
    styleUrls: ['stepper.component.less']
})
export class StepperComponent {

    @select(['claimFile', 'steps']) steps$: Observable<any>;

    @Input()
    currentStep: string = null;

    constructor(private claimFileActions: ClaimFileActions) { }

    ngOnInit() { 
        this.claimFileActions.getSteps();
    }

}