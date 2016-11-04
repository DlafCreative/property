import { Injectable } from '@angular/core';

export type InternalStateType = {
    [key: string]: any
};

@Injectable()
export class AppState {

    _state: InternalStateType = { };

    constructor() {}

    /**
     * Return a clone of the current state
     */
    get state() {
        return this._state = this._clone(this._state);
    }
    
    /**
     * Disallow mutation
     */
    set state(value) {
        throw new Error('You should not mutate the `.state` directly. Use set(prop, value) instead');
    }

    /**
     * Get direct reference to a property (be careful with circular reference)
     */
    get(prop?: any) {
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    /**
     * Set a property (internal mutating)
     */
    set(prop: string, value: any) {
        // Mutate our state internally
        return this._state[prop] = value;
    }

    /**
     * Return simple object clone
     */
    private _clone(object: InternalStateType) {
        //return JSON.parse(JSON.stringify( object ));
        return Object.assign({}, object);
    }

}