import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import budgetReducer from '../reducers/budget';
import savingsReducer from '../reducers/saving'; 
import filtersReducer from '../reducers/filters';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            expenses: budgetReducer,
            filters: filtersReducer,
            savings: savingsReducer
        }), 
        composeEnchancers(applyMiddleware(thunk))
    );
    
    return store;
 };

