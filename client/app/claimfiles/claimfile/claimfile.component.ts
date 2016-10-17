import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClaimFile } from './../shared/claimfile.model';
import { ClaimFileService } from './../shared/claimfile.service';

@Component({
    selector: 'prop-claimfile',
    templateUrl: 'claimfile.component.html',
    styleUrls: ['claimfile.component.less']
})
export class ClaimFileComponent {

    @HostBinding('class.prop-wrapper') // Add class "prop-wrapper" to the custom element

    claimFile: ClaimFile;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private claimFileService: ClaimFileService) {}

    ngOnInit() {
        let that = this;
        let claimFileId = +this.route.snapshot.params['id'];
        this.claimFileService.getClaimFile(claimFileId)
                             .subscribe(
                                 claimFile => {
                                     that.claimFile = claimFile.data.attributes });
    }
}