import { Injectable }                       from '@angular/core';
import { HttpClient }                       from '../lib';

import { ClaimFile }                        from './claimfile.model';
import { ClaimFileDraft }                   from './claimfile-draft.model';

@Injectable()
export class ClaimFileService {

    static GET_COVERAGE_PATH = 'coverages';
    static CLAIMFILE_PATH = 'claimfile';
    static CLAIMFILES_PATH = 'claimfiles';
	
	constructor(
        private httpClient: HttpClient) {}

    createClaimFile(claimFileDraft: ClaimFileDraft) {
        let draftToJson = claimFileDraft.toJson();
        return this.httpClient.post(ClaimFileService.CLAIMFILE_PATH, draftToJson)
                                    .map(
                                        (res) => {
                                            return res.data.attributes;
                                        }
                                    );
    }

	getClaimFiles(){
        return this.httpClient.get(ClaimFileService.CLAIMFILES_PATH)
                                    .map(
                                        (res) => {
                                            return res.data;
                                        }
                                    );
    }

	getClaimFileById(id: string){
        let claimFilePath = `${ClaimFileService.CLAIMFILE_PATH}/${id}`;
        return this.httpClient.get(claimFilePath)
                                  .map(
                                      (res) => {
                                          return res.data.attributes;
                                      }
                                  );
    }

    getCoverages() {
        return this.httpClient.get(ClaimFileService.GET_COVERAGE_PATH);
    }
}