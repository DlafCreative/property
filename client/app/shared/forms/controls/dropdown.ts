import { ControlBase }  from './control-base';

export class Dropdown extends ControlBase<string> {
    controlType = 'dropdown';
    choices: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        var blankOption, fullOptions;
        if (options['choices']){
            blankOption = { '': 'Choisissez' };
            fullOptions = Object.assign({}, blankOption, options['choices']);
        }
        this.choices = fullOptions ||  [];
    }
}