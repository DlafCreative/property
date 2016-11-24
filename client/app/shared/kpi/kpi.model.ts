/**
 * Kpi class
 */
export class Kpi {

    primaryTitle: string;
    indicator: string;
    secondaryTitle: string;
    status: string;

    constructor(primaryTitle, indicator, secondaryTitle = null, status = 'default') {
        if (!primaryTitle || (indicator == null)){
            throw new Error('primaryTitle and indicator are mandatories');
        }
        this.primaryTitle = primaryTitle;
        this.indicator = indicator;
        this.secondaryTitle = secondaryTitle;
        this.status = status;
    }
}