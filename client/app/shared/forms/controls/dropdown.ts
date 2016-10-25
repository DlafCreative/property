import { ControlBase }  from './control-base';

export class Dropdown extends ControlBase<string> {
    controlType = 'dropdown';
    choices: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);        
        this.choices = options['choices'] ||  [];
    }
}