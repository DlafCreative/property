const INITIAL_STATE = {
    customerNumber: null,
    username: null,
    access_token: null,
    isLoading: false
};

export function sessionReducer(
    state = INITIAL_STATE,
    action
) { 
    switch (action.type) {
        default:
            return state;
    }

}