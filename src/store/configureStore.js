 import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
 import thunk from 'redux-thunk';

 import authReducer from '../reducers/auth';
 import budgetReducer from '../reducers/budget';
import filtersReducer from '../reducers/filters';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            budget: budgetReducer,
            filters: filtersReducer
        }), 
        composeEnchancers(applyMiddleware(thunk))
    );
    
    return store;
 };

