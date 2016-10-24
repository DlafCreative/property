import { Injectable }   from '@angular/core';

import { 
    ControlBase,
    Textbox,
    Numberbox
}  from './controls';

/**
 * This class converts metadata received from the API to an understandable list of Property form elements  
 */
@Injectable()
export class MetadataTranslatorService {
    
    getFormElements(metadata: any[]) {
        let elements: ControlBase<any>[] = [];
        
        /** Iterate among fieldset */
        if (metadata.length) {
            metadata.forEach( (fieldsetDef) => {
                let fields = fieldsetDef.attributes.fields;

                /** Iterate among fields */
                if (fields.length) {
                    fields.forEach( (field) => {

                        /** Field common options */
                        let formField,
                            formFieldOptions = {
                                key: field.name,
                                label: field.label,
                                value: field.value,
                                required: field.mandatory
                            };

                        switch (field.type) {
                            case 'text':
                                formField = new Textbox(formFieldOptions);
                                break;
                            case 'integer': 
                                formField = new Numberbox(formFieldOptions);
                                break
                            default:
                            //throw new Error('Unknown form field type : ' + field.type);
                        }

                        if (formField){
                            elements.push( formField );
                        }
                    })
                }
            });
        }
        return elements;
    }
}