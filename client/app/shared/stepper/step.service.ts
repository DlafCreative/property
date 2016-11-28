import { Injectable } from '@angular/core';
import { HttpClient } from '../lib';

@Injectable()
export class StepService {

    static STEP_PATH = 'steps';

    constructor(private httpClient: HttpClient) { }

    getSteps() {
        return this.httpClient.get(StepService.STEP_PATH);
    }
}