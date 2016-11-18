const INITIAL_STATE = {
    currentClaimFile: null,
    coverages: null
};

export function claimFileReducer(
    state = INITIAL_STATE, 
    action
) {
    switch (action.type) {
        case 'SET_COVERAGES':
            return Object.assign({}, state, { coverages: action.payload.coverages });
        case 'SET_CURRENT_CLAIMFILE':
            return Object.assign({}, state, { currentClaimFile: action.payload.currentClaimFile });
        default:
            return state;
    }
}