import { Component, HostBinding, ViewEncapsulation }   from '@angular/core';
import { Kpi }                      from '../shared/kpi/kpi.model'; //@todo : move this import into a service, depending on how the stats are retrieved

import { ClaimFileActions }         from '../../actions';

import { select }                   from 'ng2-redux';
import { Observable }               from 'rxjs';

@Component({
	selector:     'prop-claimfile-page',
	templateUrl:  'claimfiles-page.component.html',
    styleUrls:    ['claimfiles-page.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ClaimFilesPageComponent {

    @HostBinding('class.prop-wrapper')

    @select(['session', 'access_token']) access_token$: Observable<String>;

    @select(['claimFiles', 'collection']) claimFiles$: Observable<any>;

    @select(['claimFiles', 'isLoading']) isLoading$: Observable<any>;

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
        private claimFileActions: ClaimFileActions) {}

	ngOnInit() {
        // Retrieve claimfiles
        let { claimFiles } = this.claimFileActions.getState();
        if (!claimFiles.collection) {
            this.claimFileActions.getClaimFiles();
        }
	}

    onRowSelect(event) {
        this.claimFileActions.goToClaimFile(event.data.attributes);
    }
}