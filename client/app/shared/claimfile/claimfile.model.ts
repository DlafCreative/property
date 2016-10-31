import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { Step } from '../stepper/step.model';

@JsonApiModelConfig({
    type: 'claim_file'
})
export class ClaimFile extends JsonApiModel {

    @Attribute()
    customerName: string;

    @Attribute()
    customerNumber: number;
    
    @Attribute()
    policyNumber: string;

    @Attribute()
    dateOfEvent: string;

    @Attribute()
    insurerExternalClaimFileId: string;

    @BelongsTo() // Can't exploit related resources as the backend doesn't return it yet
    step: Step;
}