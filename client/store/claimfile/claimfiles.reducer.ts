const INITIAL_STATE = {
    collection: null
};

export function claimFilesReducer(
    state = INITIAL_STATE, 
    action
) {
    switch (action.type) {
        case 'SET_CLAIMFILE_COLLECTION':
            return Object.assign({}, state, { collection: action.payload.collection });
        default:
            return state;
    }
}