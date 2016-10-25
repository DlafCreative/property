import { ControlBase } from './control-base';

export class DatePicker extends ControlBase<string> {
    controlType = 'datepicker';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || 'date';
    }
}