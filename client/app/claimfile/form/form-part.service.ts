import { Injectable } from '@angular/core';
import { HttpClient } from '../../shared';

import { MetadataTranslatorService } from '../../shared/forms/metadata-translator.service';

@Injectable()
export class FormPartService {

    static FORM_PART_PATH = 'form-part';

    private reqOptions;

    constructor(
        private httpClient: HttpClient, 
        private metaDataTranslator: MetadataTranslatorService) { }

    getFormMetadata(claimFileId: string, context: string) {

        let formPartPath = `${FormPartService.FORM_PART_PATH}/${claimFileId}/${context}`;

        return this.httpClient.get(formPartPath)
                                  .map( 
                                      (res) => { 
                                          return this.metaDataTranslator.getFormElements(res.data)
                                      }
                                  );
        
    }

    submitFormPart(claimFileId: string, context: string, data: any) {
        let payload = this.formatPayload(data);
        let uri = `${FormPartService.FORM_PART_PATH}/${claimFileId}/${context}`;

        return this.httpClient.post(uri, payload)
                                .map(
                                    (res) => {
                                        return res.data;
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