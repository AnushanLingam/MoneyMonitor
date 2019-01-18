// Default Categories

const bills = {
    name: "Bills",
    id: "1"
}

const rent = {
    name: "Rent",
    id: "2"
}

const food = {
    name: "Food",
    id: "3"
}

const leisure = {
    name: "Leisure",
    id: "4"
}

const debt = {
    name: "Debt",
    id: "5"
}


const defaultSettingsState = {
    currency: "en-gb",
    defaultCategories: [bills, rent, food, leisure, debt],
    userCategories: [],
    theme: "light"
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
        case "EDIT_CATEGORY":
                return {
                    ...state,
                    userCategories: state.userCategories.map((category) => {
                        if(category.id === action.id) {
                            return{
                                ...category,
                                ...action.updates
                            };
                        } else {
                            return category;
                        }
                    })
                }
        case "REMOVE_CATEGORY": 
                return {
                    ...state,
                    userCategories: state.userCategories.filter((category) => category.id !== action.id)
                };
        case "SET_THEME":
                return {
                    ...state,
                    theme: action.theme
                }
        default:
            return state;
    };
};