import { combineReducers }  from 'redux';

import { SessionReducer }   from './session/session.reducer';
import { claimFileReducer } from './claimfile/claimfile.reducer';

export interface IAppState {
    session?: {
        customerNumber: string,
        username: string,
        access_token: string,
        refresh_token: null,
        isProcessing: boolean,
        isLogged: boolean
    },
    claimFile: {
        currentClaimFile: any,
        coverages?: any,
        isSubmittingDraft: boolean
    }
}

export const rootReducer = combineReducers<IAppState>({
    session: SessionReducer,
    claimFile: claimFileReducer
});