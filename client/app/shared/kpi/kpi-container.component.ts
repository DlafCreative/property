import { Component, Input } from '@angular/core';

@Component({
    selector: 'prop-kpi-container',
    template: `
        <div class="kpi-container">
            <prop-kpi *ngFor="let kpi of kpis" 
                primaryTitle="{{ kpi.primaryTitle }}" 
                indicator="{{ kpi.indicator }}" 
                secondaryTitle="{{ kpi.secondaryTitle }}"
                status="{{ kpi.status }}"></prop-kpi>
        </div>
    `,
    styleUrls: ['kpi-container.component.less']
})
export class KpiContainerComponent {

    @Input() kpis: any[];

    constructor() { }
}