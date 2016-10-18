import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

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
}