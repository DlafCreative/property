export class ClaimFileDraft {

    resourceName = 'claim_file';

    constructor(
        public customerName?: string,
        public customerNumber?: string,
        public dateOfEvent?: string,
        public policyNumber?: number,
        public insurerExternalClaimFileId?: string,
        public coverage?: string) {}
}