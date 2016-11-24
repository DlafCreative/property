import { Component, HostBinding }    from '@angular/core';
import { ClaimFileService }          from './../shared/claimfile/claimfile.service';
import { Kpi } from '../shared/kpi/kpi.model'; //@todo : move this import into a service, depending on how the stats are retrieved

import { ClaimFileActions }         from '../../actions';

@Component({
	selector:     'prop-claimfile-page',
	templateUrl:  './claimfiles-page.component.html',
    styleUrls:    ['./claimfiles-page.component.less']
})
export class ClaimFilesPageComponent {

    @HostBinding('class.prop-wrapper') // Add class "prop-wrapper" to the custom element

    claimFiles: any[] = [];  //@todo: any[] = []; => ok, any[] => ko

    kpis: Kpi[] = [ // @todo : get KPIs definition from service
        new Kpi('Open Claimfiles', 252),
        new Kpi('Validity of policy', 142, null, 'success'),
        new Kpi('Coverage checking', 128, null, 'success'),
        new Kpi('Damage estimation', 42, null, 'primary'),
        new Kpi('Indemnities evaluation', 15, null, 'primary'),
        new Kpi('Repairer assignment', 48, null, 'warning'),
        new Kpi('Expert assignment', 28, null, 'warning'),
        new Kpi('Loss settlement', 18, null, 'warning'),
        new Kpi('Closing', 15),
    ];

	constructor(
        private claimFileService: ClaimFileService,
        private claimFileActions: ClaimFileActions) {}

	ngOnInit() {
        // Reset current claimfile
        this.claimFileActions.clearCurrentClaimFle();

		// Get claimFiles
        let claimFiles$ = this.claimFileService.getClaimFiles();
        claimFiles$.subscribe(
            claimFiles => this.claimFiles = claimFiles);
	}
}