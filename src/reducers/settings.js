// Default Categories

const bills = {
    name: "Bills"
}

const rent = {
    name: "Rent"
}

const food = {
    name: "Food"
}

const leisure = {
    name: "Leisure"
}

const debt = {
    name: "Debt"
}


const defaultSettingsState = {
    currency: "en-gb",
    defaultCategories: [bills, rent, food, leisure, debt],
    userCategories: []
}

export default (state = defaultSettingsState, action) => {
    switch(action.type) {
        case "SET_CURRENCY": 
            return {
                ...state,
                currency: action.currency
            };
        case "SET_USER_CATEGORIES":
            return {
                ...state,
                userCategories: action.categories
            };
        case "ADD_CATEGORY":
            return {
                ...state,
                userCategories: [...state.userCategories, action.category]
            };
        default:
            return state;
    };
};