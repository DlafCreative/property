import { Component }    from '@angular/core';

import { MdDialogRef }  from '@angular/material';

@Component({
    selector: 'prop-dialog',
    template: `
        <div class="prop-dialog-wrapper">            
            <div class="prop-dialog__content">
                {{ content }}
            </div>       
            <div class="prop-dialog__footer" *ngIf="type === 'alert'">
                <button class="btn flat" type="button" (click)="dialogRef.close('yes')">OK</button>
            </div>
            <div *ngIf="type === 'confirm'">
                <button type="button" (click)="dialogRef.close('yes')">ANNULER</button>
                <button type="button" (click)="dialogRef.close('no')">CONFIRMER</button>
            </div>
            <div *ngIf="type === 'modal'">
                <button type="button" (click)="dialogRef.close('yes')">BOUTON 1</button>
                <button type="button" (click)="dialogRef.close('no')">BOUTON 2</button>
            </div>
        </div>
        
    `
})
export class TalkDialogComponent {
    content: string;
    type: string = 'alert';
    constructor(public dialogRef: MdDialogRef<TalkDialogComponent>){}
}