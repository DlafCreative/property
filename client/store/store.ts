import { combineReducers }  from 'redux';

import { sessionReducer }   from './session/session.reducer';

export interface IAppState {
    session?: {
        customerNumber: string,
        username: string,
        access_token: string,
        refresh_token: null,
        isProcessing: boolean,
        isLogged: boolean
    }
}

export const rootReducer = combineReducers<IAppState>({
    session: sessionReducer
});