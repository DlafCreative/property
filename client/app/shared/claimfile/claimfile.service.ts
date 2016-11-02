import { Injectable }                       from '@angular/core';
import { Http, Headers, RequestOptions }    from '@angular/http';

import { Datastore }                        from '../../shared/datastore.service';

import { ClaimFile }                        from './claimfile.model';

@Injectable()
export class ClaimFileService {

    // @todo : split and move path part to config file
    private claimFilesPath = `${API_HOST}:${API_PORT}/claimFiles/v1?token=${localStorage.getItem('prop_access_token')}`;
    private claimFilePath = `${API_HOST}:${API_PORT}/claimFile/`;
	
	constructor(private http: Http, private dataStore: Datastore) {}

    createModel() {
        return <ClaimFile>this.dataStore.createRecord(ClaimFile);
    }

    createClaimFile(claimFile: ClaimFile) {
        this.dataStore.createRecord(ClaimFile, claimFile).save().subscribe();
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