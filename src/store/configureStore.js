import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import budgetReducer from '../reducers/budget';
import savingsReducer from '../reducers/saving'; 
import filtersReducer from '../reducers/filters';
import settingsReducer from '../reducers/settings';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            expenses: budgetReducer,
            filters: filtersReducer,
            savings: savingsReducer,
            settings: settingsReducer
        }), 
        composeEnchancers(applyMiddleware(thunk))
    );
    
    return store;
 };

