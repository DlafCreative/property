export class ClaimFileDraft {

    //resourceName = 'claim_file'; // Commented, will be used again for JSON-api format ? 

    constructor(
        public customerName?: string,
        public customerNumber?: string,
        public dateOfEvent?: string,
        public policyNumber?: number,
        public insurerExternalClaimFileId?: string,
        public coverage?: string) {}

    /**
     * Convert model to an object that API can handle for POST request
     */
    toJson() {
        let json = {
            "claim_file": {}
        };
        let properties = Object.getOwnPropertyNames(this);
        properties.forEach( (propName, index) => {
            json.claim_file[propName] = this[propName];
        });
        return json;
    }
}