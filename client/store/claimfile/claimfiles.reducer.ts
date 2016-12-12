const INITIAL_STATE = {
    collection: null,
    isLoading: false
};

export function claimFilesReducer(
    state = INITIAL_STATE, 
    action
) {
    switch (action.type) {
        case 'SET_CLAIMFILE_COLLECTION':
            return Object.assign({}, state, { collection: action.payload.collection });
        case 'IS_LOADING':
            return Object.assign({}, state, { isLoading: action.payload.isLoading });
        default:
            return state;
    }
}