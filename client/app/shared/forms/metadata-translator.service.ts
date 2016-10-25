import { Injectable }   from '@angular/core';

import { 
    ControlBase,
    Textbox,
    DatePicker,
    Dropdown
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
                            case 'integer':
                            case 'email':
                                switch (field.type){
                                    case 'integer':
                                        formFieldOptions['type'] = 'number';
                                        break;
                                    case 'email':
                                        formFieldOptions['type'] = 'email';
                                        break;
                                    default:                                         
                                        formFieldOptions['type'] = 'text';
                                }                                
                                formField = new Textbox(formFieldOptions);
                                break;
                            case 'date':
                                /** Beautiful datepicker */
                                if (formFieldOptions['display'] === 'overlay') {
                                    formField = new DatePicker(formFieldOptions);
                                }
                                /** Quick datepicker (html5) */
                                else {        
                                    formFieldOptions['type'] = 'date';
                                    formField = new Textbox(formFieldOptions);
                                }
                                break;
                            case 'dropdown':
                            case 'country':
                                formFieldOptions['choices'] = field.choices;
                                formField = new Dropdown(formFieldOptions);
                                break;
                            default:
                            throw new Error('Unknown form field type : ' + field.type);
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