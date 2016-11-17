const INITIAL_STATE = {
    customerNumber: null,
    username: null,
    access_token: null,
    refresh_token: null,
    isProcessing: false,
    isLogged: false
};

export function sessionReducer(
    state = INITIAL_STATE,
    action
) { 
    switch (action.type) {
        case 'SET_PROCESSING':
            return Object.assign({}, state, { isProcessing: action.payload.isProcessing });
        case 'SET_USER_DATA':
            return Object.assign(
                {}, 
                state, 
                { 
                    customerNumber: action.payload.customer_number,
                    username: action.payload.username,
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token,
                    isLogged: true
                }
            );
        default:
            return state;
    }

}