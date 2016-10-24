import { ControlBase } from './control-base';

export class Numberbox extends ControlBase<string> {
    controlType = 'number';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}