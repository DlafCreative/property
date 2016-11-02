import { ControlBase }  from './control-base';

export class Dropdown extends ControlBase<string> {
    controlType = 'dropdown';
    choices: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        if (options['choices']){
            options['choices'][''] = '';
        }
        this.choices = options['choices'] ||  [];
    }
}