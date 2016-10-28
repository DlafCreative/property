import { Component } from '@angular/core';

import { Datastore } from '../datastore.service';

import { Step }     from './step.model';

@Component({
    selector: 'prop-stepper',
    templateUrl: 'stepper.component.html',
    styleUrls: ['stepper.component.less']
})
export class StepperComponent {

    steps: any[] = [];
    currentStep: string;

    constructor( private dataStore: Datastore ){}

    ngOnInit() { 
        this.getSteps();
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