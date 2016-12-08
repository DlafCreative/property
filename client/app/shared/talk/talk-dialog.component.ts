import { Component }    from '@angular/core';

import { JsonApiError } from '../lib/jsonapi-error.model';

import { MdDialogRef }  from '@angular/material';

@Component({
    selector: 'prop-dialog',
    templateUrl: 'talk-dialog.component.html',
    styleUrls: ['talk-dialog.component.less']
})
export class TalkDialogComponent {
    title: string;
    content: string|Object;
    type: string = 'alert';
    constructor(public dialogRef: MdDialogRef<TalkDialogComponent>){}

    isJsonApiError() {
        return this.content instanceof JsonApiError;
    }
}