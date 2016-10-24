import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';

import { MetadataTranslatorService } from '../../shared/forms/metadata-translator.service';

@Injectable()
export class FormMetadataService {

    private uri = API_HOST + ':' + API_PORT + '/form-metadata';

    constructor(private http: Http, private formTranslator: MetadataTranslatorService) { }

    getFormMetadata(claimFileId: string, context: string) {
        
        let body = JSON.stringify({
            claimFileId: claimFileId,
            context: context
        });
        
		let options = new RequestOptions({ 
            headers: new Headers({ 'Content-Type': 'application/vnd.api+json', 'Authorization': 'Bearer ' + localStorage.getItem('prop_access_token') }) 
        });

		return this.http.post(this.uri, body, options)
				   		.map( (res) => { 
                                let body = res.json();
                                if (body.data){
                                    return this.formTranslator.getFormElements(body.data);
                                }
                            } 
                        );
    }

}