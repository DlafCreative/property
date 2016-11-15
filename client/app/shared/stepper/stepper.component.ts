import { Component, Input } from '@angular/core';

import { Datastore }        from '../datastore.service';
import { AppState }         from '../appstate.service';

import { Step }             from './step.model';

@Component({
    selector: 'prop-stepper',
    templateUrl: 'stepper.component.html',
    styleUrls: ['stepper.component.less']
})
export class StepperComponent {

    steps: any[] = [];

    @Input()
    currentStep: string = null;

    constructor( private dataStore: Datastore, private appState: AppState ){}

    ngOnInit() { 
        this.getSteps();
        console.log(this.appState.get('claimFileId'));
    }

    getSteps() {
        this.dataStore.query(Step)
                      .subscribe(
                          (steps: Step[]) => { 
                              this.steps = steps;
                            }
                      );
    }

}