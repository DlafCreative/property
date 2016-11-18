import { Injectable }                       from '@angular/core';
import { Http, Headers, RequestOptions }    from '@angular/http';

import { HttpClient }                       from '../lib';

import { Datastore }                        from '../../shared/datastore.service';

import { ClaimFile }                        from './claimfile.model';

import { ClaimFileDraft }                   from './claimfile-draft.model';

@Injectable()
export class ClaimFileService {

    static GET_COVERAGE_PATH = 'coverages';
    static CLAIMFILE_PATH = 'claimfile';

    // @todo : split and move path part to config file
    private claimFilesPath = `${API_HOST}:${API_PORT}/claimFiles/v1?token=${localStorage.getItem('prop_access_token')}`;
    private claimFilePath = `${API_HOST}:${API_PORT}/claimFile/`;
	
	constructor(
        private http: Http, 
        private httpClient: HttpClient,
        private dataStore: Datastore) {}

    getCoverages() {
        return this.httpClient.get(ClaimFileService.GET_COVERAGE_PATH);
    }

    createModel() {
        return <ClaimFile>this.dataStore.createRecord(ClaimFile);
    }

    createClaimFile(claimFileDraft: ClaimFileDraft) {
        //this.dataStore.createRecord(ClaimFile, claimFile).save().subscribe();
        let toJsonApi = true;
        return this.httpClient.post(ClaimFileService.CLAIMFILE_PATH, claimFileDraft, toJsonApi);
    }

	getClaimFiles(){
        return this.http.get(this.claimFilesPath)
                        .map( res => {
                            return res.json() || {} 
                        } )
                        // @todo : implement error handling
                        //.catch( (error) => { console.log(error); return Observable.throw(error) } ); 
    }

	getClaimFile(id: number){
        let claimFilePath = this.claimFilePath + id + `?token=${localStorage.getItem('prop_access_token')}`;
        return this.http.get(claimFilePath)
                        .map( res => {
                            return res.json() || {}
                        });
    }
}