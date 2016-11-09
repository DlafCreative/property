import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } 	from '@angular/http';

import { MetadataTranslatorService } from '../../shared/forms/metadata-translator.service';

@Injectable()
export class FormPartService {

    private uri = API_HOST + ':' + API_PORT + '/form-metadata';

    private reqOptions;

    constructor(private http: Http, private formTranslator: MetadataTranslatorService) { 
        this.reqOptions = new RequestOptions({ 
            headers: new Headers({ 'Content-Type': 'application/vnd.api+json', 'Authorization': 'Bearer ' + localStorage.getItem('prop_access_token') }) 
        });
    }

    getFormMetadata(claimFileId: string, context: string) {
        
        let body = JSON.stringify({
            claimFileId: claimFileId,
            context: context
        });

		return this.http.post(this.uri, body, this.reqOptions)
				   		.map( (res) => { 
                                let body = res.json();
                                if (body.data){
                                    return this.formTranslator.getFormElements(body.data);
                                }
                            } 
                        );
    }

    submitFormPart(claimFileId: string, context: string, data: any) {
        let payload = this.formatPayload(data);
        
        let body = JSON.stringify({
            claimFileId: claimFileId,
            context: context,
            formPartData: payload
        });

        return this.http.post('http://192.168.33.10:7000/form-part', body, this.reqOptions)
				   		.map( (res) => { 
                                let body = res.json();
                                if (body.data){
                                    return body.data;
                                }
                            } 
                        );
    }

    formatPayload(payload: any) {
        let keys = Object.keys(payload);
        let formattedPayload = { 
            'field_collection' : {
                'groups' : [{
                    'fields' : []
                }]
            }
        };
        for (let key of keys) {
            formattedPayload['field_collection']['groups'][0]['fields'].push({
                'name': key,
                'value': payload[key]
            })
        }
        console.log(formattedPayload);

        return formattedPayload;
    }

}