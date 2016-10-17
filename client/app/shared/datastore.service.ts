import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore } from 'angular2-jsonapi';
import { Http, Headers, RequestOptions } 	from '@angular/http';

/**
 * Import models
 */
import { ClaimFile } from './claimfile/claimfile.model';

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: API_HOST + ':' + API_PORT + '/',
    models: {
        claimFile: ClaimFile
    }
})
export class Datastore extends JsonApiDatastore {

    constructor(http: Http) { 
        super(http);
    }

}