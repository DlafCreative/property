import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-kpi',
    template: `
        <div class="kpi {{ status }} {{ statusColor[status] }}">
            <p class="kpi__primaryTitle">{{ primaryTitle }}</p>
            <h4>{{ indicator }}</h4>
            <p class="kpi__secondaryTitle" *ngIf="secondaryTitle">{{ secondaryTitle }}</p>
        </div>
    `,
    styleUrls: ['kpi.component.less']
})
export class KpiComponent {

    @Input() primaryTitle: string;
    @Input() secondaryTitle: string;
    @Input() indicator: string;
    @Input() status: string = 'default';

    private statusColor = {
        'default': 'grey',
        'primary': 'blue',
        'success': 'green',
        'warning': 'orange',
        'danger':  'red'
    };

    constructor() { }
}