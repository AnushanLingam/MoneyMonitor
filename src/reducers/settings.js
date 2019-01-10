const defaultSettingsState = {
    currency: "en-gb"
}

export default (state = defaultSettingsState, action) => {
    switch(action.type) {
        case "SET_CURRENCY": 
            return {
                ...state,
                currency: action.currency
            };
        default:
            return state;
    };
};