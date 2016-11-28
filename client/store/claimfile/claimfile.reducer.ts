const INITIAL_STATE = {
    currentClaimFile: null,
    coverages: null,
    isSubmittingDraft: false,
    steps: null
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
        case 'CLEAR_CURRENT_CLAIMFILE':
            return Object.assign({}, state, { currentClaimFile: null});
        case 'IS_SUBMITTING_DRAFT': 
            return Object.assign({}, state, { isSubmittingDraft: action.payload.isSubmittingDraft});
        case 'SET_STEPS':
            return Object.assign({}, state, { steps: action.payload.steps });
        default:
            return state;
    }
}