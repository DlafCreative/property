import { Injectable }           from '@angular/core';
import { TalkDialogComponent }  from './talk-dialog.component';

import { MdDialog, MdDialogRef } from '@angular/material';

@Injectable()
export class TalkService {

    dialogRef: MdDialogRef<TalkDialogComponent>;
    
    constructor(private mdDialog: MdDialog) {}

    toast(message: string, duration: number = 4000) {
        Materialize.toast(message, duration);
    }

    alert(content: any, title: string = null) {
        this.dialogRef = this.mdDialog.open(TalkDialogComponent);

        this.dialogRef.componentInstance.type = 'alert';
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.content = content;
        
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

    confirm(content) {        
        this.dialogRef.componentInstance.type = 'confirm';
    }

    modal(content) {
        this.dialogRef.componentInstance.type = 'modal';
    }
}