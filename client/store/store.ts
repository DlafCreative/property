import { combineReducers }  from 'redux';

import { sessionReducer }   from './session/session.reducer';

export interface IAppState {
    session?: {
        customerNumber: string,
        username: string,
        access_token: string,
        isLoading: boolean
    },
    counter?: 0
}

export const rootReducer = combineReducers<IAppState>({
    session: sessionReducer
});