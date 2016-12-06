import { Component, HostBinding }   from '@angular/core';
import { ClaimFileService }         from './../shared/claimfile/claimfile.service';
import { Kpi }                      from '../shared/kpi/kpi.model'; //@todo : move this import into a service, depending on how the stats are retrieved

import { ClaimFileActions }         from '../../actions';

import { select }                   from 'ng2-redux';
import { Observable }               from 'rxjs';

@Component({
	selector:     'prop-claimfile-page',
	templateUrl:  'claimfiles-page.component.html',
    styleUrls:    ['claimfiles-page.component.less']
})
export class ClaimFilesPageComponent {

    @HostBinding('class.prop-wrapper') // Add class "prop-wrapper" to the custom element

    @select(['session', 'access_token']) access_token$: Observable<String>;

    claimFiles: any[] = [];  //@todo: any[] = []; => ok, any[] => ko

    kpis: Kpi[] = [ // @todo : get KPIs definition from service
        new Kpi('Réception de la déclaration', 5),
        new Kpi('Vérification du contrat', 2, null, 'success'),
        new Kpi('Validation des garanties', 2, null, 'success'),
        new Kpi('Estimation des dommages', 1, null, 'primary'),
        new Kpi('Détermination indemnité', 2, null, 'primary'),
        new Kpi('Missionnement d\'un artisan', 2, null, 'warning'),
        new Kpi('Missionnement d\'un expert', 1, null, 'warning'),
        new Kpi('Règlement', 0, null, 'warning'),
        new Kpi('Clôturer dossier', 4),
    ];

	constructor(
        private claimFileService: ClaimFileService,
        private claimFileActions: ClaimFileActions) {}

	ngOnInit() {
        // Reset current claimfile
        this.claimFileActions.clearCurrentClaimFle();

        this.claimFileService.getClaimFiles().subscribe(
            (claimFiles) => {
                this.claimFiles = claimFiles;
            }
        )
	}

    onRowSelect(event) {
        this.claimFileActions.goToClaimFile(event.data.attributes);
    }
}