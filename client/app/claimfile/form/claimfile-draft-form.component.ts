import { 
    Component, 
    Input, 
    Output,
    EventEmitter }              from '@angular/core';

import { ClaimFileDraft }       from '../../shared';
import { ClaimFileActions }     from '../../../actions';

import { select }               from 'ng2-redux';
import { Observable }           from 'rxjs';

@Component({
    selector: 'prop-claimfile-draft-form',
    templateUrl: 'claimfile-draft-form.component.html'
})
export class ClaimFileDraftFormComponent {

    claimFileDraft: ClaimFileDraft = new ClaimFileDraft(
        'Nadine Morano',
        '654321',
        '11-12-2016',
        987654,
        'REF-12345',
        'TYPE_THEFT'
    );
    @select(['claimFile', 'coverages']) coverages$: Observable<any>;

    @Input()
    coverages: any;

    @Input()
    isSubmittingDraft: boolean;

    @Output()
    onSubmit = new EventEmitter<ClaimFileDraft>();

    constructor(private claimFileActions: ClaimFileActions) { }

    ngOnInit() {}

    submit() {
        this.onSubmit.emit(this.claimFileDraft);
    }
}