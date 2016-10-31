import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'steps'
})
export class Step extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    name: string;

    @Attribute()
    label: string;

    @Attribute()
    rank: number;
}