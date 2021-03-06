import { combineReducers }      from 'redux';

import { SessionReducer }       from './session/session.reducer';
import { claimFileReducer }     from './claimfile/claimfile.reducer';
import { claimFilesReducer }    from './claimfile/claimfiles.reducer';

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
        isSubmittingDraft: boolean,
        steps?: any
    },
    claimFiles: {
        collection?: any,
        isLoading: false
    }
}

/**
 * Reducers for application
 */
export const appReducer = combineReducers<IAppState>({
    session: SessionReducer,
    claimFile: claimFileReducer,
    claimFiles: claimFilesReducer
});

/**
 * This reducer allows to clear all state when logging out
 */
export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}