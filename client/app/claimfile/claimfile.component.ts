import { Component, HostBinding }           from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { ClaimFile }                        from '../shared/claimfile/claimfile.model';

@Component({
    selector: 'prop-claimfile',
    templateUrl: 'claimfile.component.html',
    styleUrls: ['claimfile.component.less']
})
export class ClaimFileComponent {

    @HostBinding('class.prop-wrapper') true; // @todo : why true is mandatory ?

    claimFile: ClaimFile;

    ClaimFileComponent;
    constructor(private route: ActivatedRoute){ }

    ngOnInit(){ 
        let claimfileId = this.route.snapshot.params['id'];
        if (claimfileId) {
            console.log('claimFileID passe : ' + claimfileId)
        }
        else {
            console.log('Claimfile ID non passé');
        }
    }

}